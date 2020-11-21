const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.post("/createBill", (req, res) => {

	var input = req.body;
	var srID = input.request_id;
	var totalCost = 0.0;

	db.query(("insert into billing (request_id, totalcost) values(?,?)"),[srID, totalCost], function(error, results) {
        if (error) throw error;
    })

});

router.put("/updateBill", (req, res) => {

	var input = req.body;
	var srID = input.request_id;
	
	db.query(("select service_id, session_time, no_of_sessions from request where request_id = ?"), [srID], function(error, results) {
        if (error) throw error;
        var serviceID = JSON.parse(results).service_id;
        var sessionTime = JSON.parse(results).session_time;
        var numSessions = JSON.parse(results).no_of_sessions;

        console.log("serviceID = " + serviceID);
        console.log("sessionTime = " + sessionTime);

    })

	db.query(("select drone_id, basecost from service where service_id = ?"), [serviceID], function(error, results) {
        if (error) throw error;
        var droneID = JSON.parse(results).drone_id;
        var baseCost = JSON.parse(results).basecost;
        console.log("droneID = " + droneID);
        console.log("baseCost = " + baseCost);
    })

    

	var totalCost = sessionTime * numSessions * baseCost;

	db.query(("update billing set totalcost = ? where request_id = ?"),[totalCost, srID], function(error, results) {
        if (error) throw error;
    })

});

module.exports = router;
