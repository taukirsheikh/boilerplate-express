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
// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}
// Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object, taking the structure {echo: word}. You can find the word to be repeated at req.params.word. You can test your route from your browser's address bar, visiting some
app.get("/:word/echo",(req, res)=>{
  res.json({echo:req.params.word})
})


// Another common way to get input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object req.query. Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them. If you use the API from JavaScript, you can use specific methods to encode/decode these characters.

// route_path: '/library'
// actual_request_URL: '/library?userId=546&bookId=6754'
// req.query: {userId: '546', bookId: '6754'}
// Build an API endpoint, mounted at GET /name. Respond with a JSON document, taking the structure { name: 'firstname lastname'}. The first and last name parameters should be encoded in a query string e.g. ?first=firstname&last=lastname.

// Note: In the following exercise you are going to receive data from a POST request, at the same /name route path. If you want, you can use the method app.route(path).get(handler).post(handler). This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.


// This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.
app.route("/name").get((req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
}).post((req, res) => {
  // res.json({ name: `${req.query.first} ${req.query.last}` });
})
// Export the app module
module.exports = app;
