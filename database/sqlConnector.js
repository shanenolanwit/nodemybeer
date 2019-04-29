var mysql = require('mysql');
var db = null;

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

module.exports = function () {
    if(!db) {
        db = mysql.createConnection({
                host: config.database.host,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database,
                dateStrings: 'date'
          });
          db.connect((err) =>{
            if(err) throw err;
            console.log('Mysql Connected...');
         });
    }
   
    return db;
};