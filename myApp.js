const express = require("express");
const app = express();
require("dotenv").config();
console.log("Hello World");


//middleWare
app.use(function(req, res, next) {
    console.log("I'm a middleware...");
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  })
// Serve static files from the 'public' directory

// Define the main route
app.get("/", (req, res) => {
  res.send("Hello Express");
});
app.get("/json", (req, res) => {
  process.env.MESSAGE_STYLE === "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" });
});

app.use("/public", express.static(__dirname + "/public"));
// Serve an HTML file for the '/index' route
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/now', function(req, res, next) {
    req.time=new Date().toString();
    next()
}, (req, res) => {
  res.json({time:req.time});
  
})
// Export the app module
module.exports = app;
