var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Change this if you want to only allow requests from a specific domain
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Change this to allow/disallow different headers
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'); // Change this to disable/enable different HTTP methods
  next();
});

var port = process.env.PORT || 3006;

app.listen(port);

routes(app);

console.log('Backend server started on: ' + port);

exports.application = app;