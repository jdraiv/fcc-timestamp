var express = require('express');
var http = require('http');
var app = express();

var moment = require('moment');

//Setting views
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


//Basic Router
app.get('/',function(req,res){
  res.render('home');
});

app.get('/:query', function(req, res) {
  var date = req.params.query;
  var unix = null;
  var natural = null;


// If date has a number value, the date is a unix timestamp
  if (date >= 0) {
    unix = date;
    natural = moment.unix(unix).format("MMMM,D,YYYY");
  }

  if (isNaN(date) && moment(date, "MMMM,D,YYYY").isValid()){
    unix = moment(date, "MMMM,D,YYYY").format("X");
    natural = moment.unix(unix).format("MMMM,D,YYYY");
  }

  var result = {"unix": unix, "natural": natural};
  res.send(result)
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Server running');
});
