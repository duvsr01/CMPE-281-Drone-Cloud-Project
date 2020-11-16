const express = require('express');
const bodyParser = require("body-parser");
//const mysql = require("mysql");
const cors = require("cors");


const app = express();
app.use(express.json());

// DB config
//const sqlURI = require("./config/keys").sqlURI;

//  connection pooling
// mongoose
//   .connect(db, { poolSize: 50 })
//   .then(() => console.log("MongoDB Connected from Mongoose(pooling)"))
//   .catch(err => console.log(err));

// //Create Connection
// const db = mysql.createPool(sqlURI);
// module.exports=db;


//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// defining routes
const UserService = require("./routes/cmpe281/UserService");
const DroneService = require("./routes/cmpe281/DroneService");
const BookingService = require("./routes/cmpe281/BookingService");

app.get("/", function(request, response) {
  console.log("Inside Node Home");
  response.send("Node Backend is working");
});

// use routes
app.use("/cmpe281/users", UserService);
app.use("/cmpe281/drones",DroneService);
app.use("/cmpe281/booking",BookingService);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}!`)
});
module.exports = app;