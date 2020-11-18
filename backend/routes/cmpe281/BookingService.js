const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.post('/bookDrone', (req, res) =>{
    let data = req.body;
    let drone_id= data.drone_id;
    let user_id= data.user_id;
    let booking_start_date= data.booking_start_date;
    let booking_end_date= data.booking_end_date;
    let inserted_rows;
    try{
    data.services.map((service,index)=>{
        let service_id = service.service_id;
        let session_time = service.session_time;
        let no_of_sessions= service.no_of_sessions;
        let service_basecost= service.service_basecost;
        db.query('insert into request (drone_id,user_id,booking_start_date,booking_end_date,service_id,session_time,no_of_sessions,service_basecost) values (?,?,?,?,?,?,?,?)'
        ,[drone_id,user_id,booking_start_date,booking_end_date,service_id,session_time,no_of_sessions,service_basecost],function(error,result){
            if(error) throw error;
            inserted_rows++;
        });  
    });
    }
    catch(error){
        console.log("Error occured: "+error);
    }
    res.send({ success:true});
    });


module.exports = router;
