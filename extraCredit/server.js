// Importing modules
var express = require('express');
var fs = require('fs');
var path = require('path');
var bp = require('body-parser');
var data = require('./data');

// Express server
var app = express();


// Enable the server to serve static files using the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the body parse module to work with the request's url
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

// Routes
// curl -X GET http://localhost:3000
// app.get('/', function(req, res) {
//   console.log('root');
//   fs.readFile('./public/index.html', function(err, data){
//     if (err) throw err;
//     res.status(200).send(data);
//     res.end();
//   })
// });


// curl -X GET http://localhost:3000/classes/messages
app.get('/classes/messages', function(req,res) {
  console.log('/classes/messages');
  res.status(200).json(data);
  res.end();
});

// curl -X GET http://localhost:3000/classes/room1
app.get('/classes/room1', function(req,res) {
  console.log('/classes/room1');
  res.status(200).json(data);
  res.end();
});

// curl -X POST http://localhost:3000/classes/messages -d "name=Elvio&text=Lets see if it works"
app.post('/classes/messages', function(req,res) {
  console.log('POST /classes/messages');

  req.on('data', function(chunk){
    var msg = JSON.parse(chunk + "");
    msg.createdAt = new Date();
    data.results.unshift(msg);
    // console.log(data.results);
    res.status(201).json(data);
  });
});

// curl -X POST http://localhost:3000/classes/room1
app.post('/classes/room1', function(req,res) {
  console.log('POST /classes/room1');

  req.on('data', function(chunk){
    var msg = JSON.parse(chunk + "");
    msg.createdAt = new Date();
    data.results.unshift(msg);
    // console.log(data.results);
    res.status(201).json(data);
  });
});

app.all('*', function(req, res){
  res.status(404).json({error: 'Invalid URL'});
  res.end();
})

// Server port
app.listen(3000, function() {
  console.log('Express server running on port: 3000');
});

