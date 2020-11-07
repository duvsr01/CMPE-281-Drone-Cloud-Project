const express = require("express");
const router = express.Router();
var passwordHash = require("password-hash");
const config = require("../../config/sqlConnection.js");
const { response } = require("../../index.js");
const db=config.db;

router.get("/test", (req, res) => res.json({ msg: "backend connection works" }));

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
  //console.log("user details:  " +email,password,uid,displayName,usertype);

  db.query ('select * from user where email =? or uid=?', [email,uid], function(error, results){
    if (results.length>0){
      console.log(results[0]);
      var email=results[0].email;
      var displayName=results[0].displayName;
      var usertype=results[0].usertype;
      res.send({email,displayName,usertype});
    }
    else{
      console.log("insert the user record");
           db.query(
          "insert into user (uid,displayName,email,password,usertype) values (?,?,?,?,?)",
          [uid,displayName, email, password, usertype],
          function(err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            res.send({email,displayName,usertype});
            
          }
        );
    }
    });
    });



module.exports = router;
