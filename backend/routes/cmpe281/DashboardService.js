const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get('/previousOrders/:id', (req,res) =>{
    db.query(('SELECT * FROM request WHERE email=? ORDER BY service_date DESC'),[req.params.id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getServiceDetails/:id', (req,res) =>{
    db.query(('SELECT * FROM service WHERE service_id=?'),[req.params.id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllServices', (req,res) =>{
    db.query(('SELECT * FROM service'), function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllUsers', (req,res) =>{
    db.query(('SELECT * FROM user WHERE usertype="customer"'), function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllRequests', (req,res) =>{
    db.query(('SELECT * FROM request'), function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

router.get('/getAllDrones', (req,res) =>{
    db.query(('SELECT * FROM drone'), function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
})

module.exports = router;