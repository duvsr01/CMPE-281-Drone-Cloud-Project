const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;


    //getUserOrders
    router.post('/trackDrone',(req,res) =>{
        const {email}= req.body;
        try{
        db.query('select  r.request_id request_id,u.displayName userName,d.name droneName,d.status droneStatus,s.name serviceName,r.service_date serviceDate,r.session_time serviceTime,r.no_of_sessions serviceSessionNumber,r.service_totalcost serviceTotalCost,r.request_status requestStatus from cmpe281.request r join cmpe281.drone d on r.drone_id=d.drone_id join cmpe281.service s on r.service_id=s.service_id join cmpe281.user u on r.email=u.email where u.email=?'
        ,[email]
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


module.exports = router;
