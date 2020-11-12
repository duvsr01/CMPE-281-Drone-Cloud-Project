const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get('/', (req, res) =>{
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

});

router.post('/createdrone',(req,res) =>{
    var drone = {};
    drone = req.body;
    db.query(('insert into drone set ?'),drone, function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

router.put('/updatedrone',(req,res) =>{

    db.query(('update drone SET '),[], function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

router.delete('/removedrone/:id',(req,res) =>{
    db.query(('delete from drone where drone_id=?'),[req.params.id], function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

router.get('/searchdrones',(req,res) =>{
    console.log("hello tues");

    var name = req.query.name;
    var description = req.query.description;


        var conditions = [];
        var values = [];
      
        if (typeof req.query.name !== 'undefined') {
          conditions.push("name LIKE ?");
          values.push("%" + req.query.name + "%");
        }
      
        if (typeof req.query.description !== 'undefined') {
          conditions.push("description LIKE ?");
          values.push("%" + req.query.description + "%");
        }
      
        var conditions = {
          where: conditions.length ?
                   conditions.join(' AND ') : '1',
          values: values
        };

      
      //var conditions = buildConditions(params);
      var sql = 'SELECT * FROM drone WHERE ' + conditions.where;

      console.log("sql query: " +sql);

      console.log("values: " + values);
      
      db.query(sql, conditions.values, function(error, results) {
        if(error) throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
      });
    
    //db.query(('select * from drone'),[name], function(error,results){
       
    


});




module.exports = router;
