var mysql      = require('mysql');
let inquirer = require("inquirer");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Blitzcrank13',
  database : 'dungeons_db'
});
 
connection.connect();
 
connection.query(function (error, results, fields) {
  if (error) throw error;
  console.log("Error");
});
 





connection.end();