const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

// router.post('/bookDrone', (req, res) =>{
//     let data = req.body;
//     let drone_id= data.drone_id;
//     let user_id= data.user_id;
//     let booking_start_date= data.booking_start_date;
//     let booking_end_date= data.booking_end_date;
//     let inserted_rows;
//     try{
//     data.services.map((service,index)=>{
//         let service_id = service.service_id;
//         let session_time = service.session_time;
//         let no_of_sessions= service.no_of_sessions;
//         let service_basecost= service.service_basecost;
//         db.query('insert into request (drone_id,user_id,booking_start_date,booking_end_date,service_id,session_time,no_of_sessions,service_basecost) values (?,?,?,?,?,?,?,?)'
//         ,[drone_id,user_id,booking_start_date,booking_end_date,service_id,session_time,no_of_sessions,service_basecost],function(error,result){
//             if(error) throw error;
//             inserted_rows++;
//         });  
//     });
//     }
//     catch(error){
//         console.log("Error occured: "+error);
//     }
//     res.send({ success:true});
//     });

    // BOOKING REQUEST FOR A DRONE SERVICE
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

    //GET ALL THE SERVICE REQUESTS PLACED BY ALL USER TO DISPLAY AT ADMIN SIDE
    router.get('/getServiceRequests',(req,res) =>{
        try{
        db.query('select  r.request_id request_id,u.displayName userName,d.name droneName,d.status droneStatus,s.name serviceName,r.service_date serviceDate,r.session_time serviceTime,r.no_of_sessions serviceSessionNumber,r.service_totalcost serviceTotalCost,r.request_status request_status from cmpe281.request r join cmpe281.drone d on r.drone_id=d.drone_id join cmpe281.service s on r.service_id=s.service_id join cmpe281.user u on r.email=u.email'
        ,["Approved","Rejected"]
        ,function(error,results){
            if(error) throw error;
            res.status(200).json(results);
        });  
        }
        catch(error){
            console.log("Error occured: "+error);
            res.status(400).json(error);
        } 
        });

    // ADMIN APPROVES A SERVICE REQUEST
    router.post('/approveServiceRequest', (req, res) =>{
        const {serviceRequestId}= req.body;
        console.log("enters into approve request api and servicerequestid is"+JSON.stringify(req.body));
        try{
            db.query('update request set request_status=? where request_id=?'
            ,["Approved",serviceRequestId],function(error,result){
                if(error) throw error;
                res.status(200).json({status:"Booking Request is Approved"});
            });  
        }
        catch(error){
            console.log("Error occured: "+error);
            res.status(400).json(error);
        }
        
        });

    // ADMIN REJECTS A SERVICE REQUEST
    router.post('/rejectServiceRequest', (req, res) =>{
        const {serviceRequestId}= req.body;
        try{
            db.query('update request set request_status=? where request_id=?'
            ,["Rejected",serviceRequestId],function(error,result){
                if(error) throw error;
                res.status(200).json({status:"Booking Request is Rejected"});
            });  
        }
        catch(error){
            console.log("Error occured: "+error);
            res.status(400).json(error);
        
        }     
        });


module.exports = router;
