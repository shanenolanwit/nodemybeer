const express = require('express')
const mysql = require('mysql');
const bodyParser = require('body-parser')
const { base64encode, base64decode } = require('nodejs-base64');
const crypto = require('crypto');




var db = require('./database/sqlConnector.js');
var conn = db();

var app = express()
var port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Welcome to NodeMyBeer'))

app.post('/auth', function (req, res) {
  console.log(req.body);
  const hash = crypto.createHash('sha256');
  hash.update(req.body.password.trim())
  let data = { 
    email : req.body.email.trim(),
    password : hash.digest('hex')
  };
  let count = 0;
   let sql = `select (select count(*) from user where email = ?) as 'exists', (select count(*) from user where email = ? AND password = ?) as 'auth' limit 1`;
  console.log(sql);
  let query = conn.query(sql, [data.email,data.email,data.password], (err, results) => {
    if(err){
      console.log(err);
      res.json({
        email: req.body.email,
        authenticated: false,
        newUser: false

      })
    }
    else{
      if(results[0].exists < 1){
        sql = "INSERT INTO user SET ?";  
        query = conn.query(sql, data, (err, results) => {
          if(err){
            console.log(err);
            res.json({
              email: req.body.email,
              authenticated: false,
              newUser: false
            })
          }
          else{
            console.log("success");
            res.json({
              email: req.body.email,
              authenticated: true,
              newUser: true
            })
          }
        });
      } else {
        res.json({
          email: req.body.email,
          authenticated: (results[0].auth === 1),
          newUser: false
        })
      }
     
      
    }
  });
 
});


app.post('/beers/new', function (req, res) {
  
  let data = { 
    latitude : req.body.coordinates.latitude,
    longitude : req.body.coordinates.longitude,
    date : req.body.date,
    name : req.body.name,
    review : req.body.review,
    base64img : req.body.base64img,
    email: req.body.email
  };
  let sql = "INSERT INTO beer SET ?";  
  console.log(sql);
  let query = conn.query(sql, data, (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
      console.log("success");
      res.json({
        data: results
      })
    }
  });
});

app.post('/beers/update/:id', function (req, res) {
  let id = req.params.id;
  
  let data = { 
    latitude : req.body.coordinates.latitude,
    longitude : req.body.coordinates.longitude,
    date : req.body.date,
    name : req.body.name,
    review : req.body.review,
    base64img : req.body.base64img
  };
  let sql = "UPDATE beer SET ? WHERE id = ?";  
  console.log(sql);
  let query = conn.query(sql, [data,id], (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
      console.log("success");
      res.json({
        data: results
      })
    }
  });
 
});

app.delete('/beers/delete/:id', function (req, res) {
  let id = req.params.id;
  
  let sql = "DELETE from beer WHERE id = ?";  
  console.log(sql);
  let query = conn.query(sql, [id], (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
      console.log("success");
      console.log(results);
      res.json({
        data: results
      })
    }
  });
 
});

app.get('/beers', function (req, res) {
  let sql = "SELECT * FROM beer WHERE email = ?";  
  console.log(sql);
  let query = conn.query(sql, [req.query.email], (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
    
      res.json({
        data: results
      })
    }
  });
});

app.get('/locate/', function (req, res) {
 
  let sql = "SELECT * FROM beer";  
  console.log("ggg" + sql);
  let query = conn.query(sql, {}, (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
     
      res.json({
        data: results
      })
    }
  });
});

app.get('/locate/:name', function (req, res) {
  let name = req.params.name;
  let data = [name]
 
  let sql = "SELECT * FROM beer WHERE name = ?";  
  console.log(sql);
  let query = conn.query(sql, data, (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
     
      res.json({
        data: results
      })
    }
  });
});

app.get('/count', function (req, res) {  
  let email = req.query.email;
  let sql = "SELECT date, count(*) AS count FROM beer where email = ? GROUP BY date ORDER BY date ASC";  
  console.log(sql);
  let query = conn.query(sql, [req.query.email], (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
      let total = results.reduce( function(a, b){
        return a + b['count'];
      }, 0);
      res.json({
        data: results,
        total: total
      })
    }
  });
});


app.post('/count', function (req, res) {
  let fromDate = req.body.fromDate;
  let toDate = req.body.toDate;

  let sql = `SELECT date, COUNT(*) AS count FROM beer WHERE date >= '${fromDate}' && date <= '${toDate}' && email = ? GROUP BY date ORDER BY date ASC`;  
  console.log(sql);
  let query = conn.query(sql, [req.query.email], (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
      let total = results.reduce( function(a, b){
        return a + b['count'];
      }, 0);
      res.json({
        data: results,
        total: total
      })
    }
  });
});

app.get('/beers/:id', function (req, res) {  
  let id = req.params.id;
  let data = [id]
  let sql = "SELECT * FROM beer where id = ?";  
  console.log(sql);
  let query = conn.query(sql, data, (err, results) => {
    if(err){
      console.log(err);
      res.json({
        data: err
      })
    }
    else{
     
      res.json({
        data: results
      })
    }
  });
});

app.listen(port, () => console.log(`NodeMyBeer listening on port ${port}!`));