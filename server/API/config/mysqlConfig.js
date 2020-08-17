// var express = require('express');
var mysql = require('mysql');
config = {
  host: 'instavirtualdb.cvtzjfln1737.ap-south-1.rds.amazonaws.com',
  port: 3306,
  user: 'root',
  password: 'insta12345',
  database: 'instavirtual'
}
var connection = mysql.createConnection(config); //added the line
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected Successfully!");
});
module.exports = {
  connection: mysql.createPool(config)
}