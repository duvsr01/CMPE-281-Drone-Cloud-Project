const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get('/previousOrders/:id', (req,res) =>{
    db.query(('select * from request where user_id=?'),[req.params.id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getServiceDetails/:id', (req,res) =>{
    db.query(('select * from service where service_id=?'),[req.params.id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

module.exports = router;