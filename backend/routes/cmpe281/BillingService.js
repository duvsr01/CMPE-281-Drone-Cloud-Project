const express = require("express");
const router = express.Router();
const config = require("../../config/sqlConnection.js");
const db=config.db;

router.post("/createBill", (req, res) => {

	let input = req.body;
	let srID = input.request_id;
	let totalCost = 0.0;

	db.query(("insert into billing (request_id, totalcost) values(?,?)"),[srID, totalCost], function(error, results) {
        if (error) throw error;
    })

});

router.put("/updateBill", (req, res) => {

	let input = req.body;
	let srID = input.request_id;
	
	db.query("select service_id, session_time, no_of_sessions from request where request_id = ?", [srID], function(error, results)) {
        if (error) throw error;
        let serviceID = JSON.parse(results).service_id;
        let sessionTime = JSON.parse(results).session_time;
        let numSessions = JSON.parse(results).no_of_sessions;

        console.log("serviceID = " + serviceID);
        console.log("sessionTime = " + sessionTime);

    })

	db.query("select drone_id, basecost from service where service_id = ?", [serviceID], function(error, results)) {
        if (error) throw error;
        let droneID = JSON.parse(results).drone_id;
        let baseCost = JSON.parse(results).basecost;
        console.log("droneID = " + droneID);
        console.log("baseCost = " + baseCost);
    })

    

	let totalCost = sessionTime * numSessions * baseCost;

	db.query(("update billing set totalcost = ? where request_id = ?"),[totalCost, srID], function(error, results) {
        if (error) throw error;
    })

});