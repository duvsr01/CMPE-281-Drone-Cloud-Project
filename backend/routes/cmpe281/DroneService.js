const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.get('/', (req, res) =>{
    db.query(("select * from drone where status='active'"), function(error,results){
        if(error)
        throw error;
        console.log("results : " +JSON.stringify(results));
        res.end(JSON.stringify(results));
    })
});

router.get('/getDroneById',(req,res) =>{

    var id = req.query.id;
    console.log("id: " + id);
    db.query(('select * from drone where drone_id=?'),[id], function(error,results){
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
    var drone = {};
    drone = req.body;
    db.query(('UPDATE drone SET name=?,size=?,type=?,description=? where drone_id = ?'),[drone.name,drone.size,drone.type,drone.description,drone.id],function(error,results){
        if(error) throw error;
        //res.end(JSON.stringify(results));
    })

});

router.patch('/removedrone',(req,res) =>{

    var id = req.query.id;
    console.log("id: " + id);

    db.query(('update drone set status="inactive" where drone_id=?'),[id], function(error,results){
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
        
        conditions.push("status = ?");
        values.push('active');

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
