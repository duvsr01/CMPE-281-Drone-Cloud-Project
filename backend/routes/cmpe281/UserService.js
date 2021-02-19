const { response } = require("express");
const express = require("express");
const router = express.Router();
var passwordHash = require("password-hash");
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get("/test", (req, res) => res.json({ msg: "backend connection works" }));

// user register and login api
router.post("/register", (req, res) => {
  console.log("Inside register api");
  var email = req.body.email;
  var uid = req.body.uid;
  var password = req.body.password;
  var displayName= req.body.displayName;
  var usertype;
  if(email.substring(email.indexOf('@')+1)=="sjsu.edu"){
      usertype ="admin";
  }
  else{
      usertype="customer";
  }
  console.log("user details:  " +uid,displayName,email,password,usertype);

  db.query ('select * from user where email =? and uid=?', [email,uid], function(error, results){
    if (results.length>0){
      console.log(results[0]);
      console.log("User already exists");
      res.send({email,displayName,usertype});
       
    }
    else{
      console.log("insert the user record");
           db.query('INSERT INTO user (uid,displayName,email,password,usertype) VALUES (?,?,?,?,?)',[uid,displayName,email,password,usertype],
          function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            res.send({email,displayName,usertype});
          }
        );
    }
    });
    });


    //update profile for customers and pilots
    router.post("/updateProfile", (req,res) =>{
      console.log("update Profile api");
      console.log("data is "+req.body);
      const{email,usertype,phone,address1,address2,city,stateName,zip,locality,ranch_name}=req.body;

      //if usertype is client, insert address id in address table and the email and profile info to client table
      try{
        db.query('update user set usertype=?, phone=? where email=?',[usertype,phone,email],function(error,result){
          if(error) throw error;
        });

        db.query('insert into address(email,address1,address2,city,stateName,zip) values (?,?,?,?,?,?)'
        ,[email,address1,address2,city,stateName,zip]
        ,function(error,result){
          if(error) throw error;

          if(usertype=='customer'){
            db.query('insert into client(email,address_id,ranch_name,locality) values(?,?,?,?)'
            ,[email,result.insertId,ranch_name,locality],function(error,result){
              if(error) throw error;
            });
          }
          if(usertype=='pilot'){
            db.query('insert into pilot(email,address_id,locality,active_status) values(?,?,?,?)'
            ,[email,result.insertId,locality,true],function(error,result){
              if(error) throw error;
            });
          }
          
        }); 
       
      } 
      catch(error){
        console.log("Error Occured: "+error);
      }
    res.status(200).json(200);
    });
    
    // update account 
    router.post("/updateAccount", (req,res) =>{
      console.log("update account api");
      console.log("data is "+req.body);
      const{email,address1,address2,city,stateName,zip}=req.body;
      try{
        db.query('update user set address1=?,address2=?,city=?,stateName=?,zip=? where email=?',
        [address1,address2,city,stateName,zip,email],
        function(error,result){
          if(error) throw error;
        });
      }
        catch(error){
          console.log("Error Occured: "+error);
        }
        res.status(200).json(200);
    });

    // Pilot-Drone Mapping
    router.post("/pilotDroneMapping",async(req,res)=>{
    const {email,drones}=req.body;
      console.log("inside pilot-drone mapping api");
      console.log("email is: "+email);
      console.log("drones: "+drones);
      try{
      if(Array.isArray(drones) && drones.length==0)
        throw new Error('Drones list is empty');
      for( id in drones){
          console.log("the drone_id is "+ drones[id]);
        await db.query('insert into pilot_drone (email,drone_id) values(?,?)',
        [email,drones[id]],
        function(error,result){
          if(error) throw error;
        }
        )       
      }
      res.status(200).json(200);
    }
    // Handle errors
      catch(error){
        console.log("Error occured: "+error);
        res.status(400).json(400);
      }
   
    });

    // Update Pilot Availability
    router.post("/updatePilotAvailability",async(req,res)=>{
      const{email,slots}=req.body;
      console.log("Inside pilot availability api ");
      console.log("email: "+email );
      //console.log("slots: "+slots );
      try{
        if(email == null)
        throw new Error('Email is empty');

        if(Array.isArray(slots) && slots.length==0)
        throw new Error("Slots are empty");

        // loop through the slots
        for(i in slots)
        {
         let result= await dbOperation(email,slots[i].day_id,slots[i].session_time_id);
        // console.log("result is "+JSON.stringify(result));
        }
  
        res.status(200).json(200);  
      }
      catch(error){
        console.log("Error occured: "+error);
        res.status(400).json(400);
      }     
    });

    // inserting individual pilot availability records
     function dbOperation(email,day_id,session_time_id){
     return new Promise(async(resolve,reject)=>{
      let recordExists = await availabilityValidation(email,day_id,session_time_id);
      if(recordExists){
        console.log("Record already exists");
        reject("Record already exists");
      }
      else{
      db.query('insert into pilot_availability(email,day_id,session_time_id) values (?,?,?)',
      [email,day_id,session_time_id],
      function(error,result){
        if(error){
          console.log("Sql error: "+error);
          reject(error);
        }             
      resolve(result);
      })
      }
     })      
    }


    // Check if record exists with same pilot,day and session time
    function availabilityValidation(email,day_id,session_time_id){
      console.log("inside availability validation");
      return new Promise((resolve,reject)=>{
        db.query('select * from pilot_availability where email=? and day_id=? and session_time_id=?',
        [email,day_id,session_time_id],
        function(error,result){
          if(error){
            console.log("Sql error: "+error);
            reject(error);
          }   
         //console.log(" matching rows are "+ JSON.stringify(result)); 
         if(result.length !=0)     
           resolve(true);
        resolve(false);
        })
      })
    }



    //Get User Details
    router.post("/getUserDetails", (req,res)=>{
      const email =req.body.email;
      try{
        db.query('select * from user where email=?'
        ,[email],function(error,result){
            if(error) throw error;
            res.status(200).json(result[0]);
        });  
    }
    catch(error){
        console.log("Error occured: "+error);
    }
    });


    router.post('/bookDrone', (req, res) =>{
      const{drone_id,user_email,service_id,service_basecost
          ,service_date,session_time,
          no_of_sessions,service_totalcost} = req.body;
      try{
          db.query('insert into request (drone_id,email,service_id,service_basecost,service_date,session_time,no_of_sessions,service_totalcost) values (?,?,?,?,?,?,?,?)'
          ,[drone_id,user_email,service_id,service_basecost,service_date,session_time,no_of_sessions,service_totalcost],function(error,result){
              if(error) throw error;
          });  
      }
      catch(error){
          console.log("Error occured: "+error);
      }
      res.status(200).json({ success:true,drone_id:drone_id,service_id:service_id});
      
      });


module.exports = router;
