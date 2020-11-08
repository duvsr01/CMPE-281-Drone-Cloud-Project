const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get('/drones', (req, res) =>{
    db.query(("select * from drone"), function(error,results){
        if(error)
        throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
});

router.get('/drone/:id',(req,res) =>{
    db.query(('select * from drone where drone_id=?'),[req.params.id], function(error,results){
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })

})


module.exports = router;
