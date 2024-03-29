var mysql = require('mysql');
var express = require('express');

var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";


var mysqlHost = process.env.MYSQL_HOST || 'localhost';
var mysqlPort = process.env.MYSQL_PORT || '3306';
var mysqlUser = process.env.MYSQL_USER || 'root';
var mysqlPass = process.env.MYSQL_PASS || 'root';
var mysqlDB   = process.env.MYSQL_DB   || 'x_database';

var connectionOptions = {
   host: mysqlHost,
   port: mysqlPort,
   user: mysqlUser,
   password: mysqlPass,
   database: mysqlDB
 };


app.get('/',function(req,res){
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `FOLLOWERS` ORDER BY `FOLLOWERS`.`FOLLOWERSID` DESC';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) throw error;
     
     responseStr = '';

     results.forEach(function(data){
        responseStr += data.ITEM_NAME + ' : ';
        console.log(data);
     });

     if(responseStr.length == 0)
        responseStr = 'tA M2RE LA PUTE ';

     console.log(responseStr);

     res.status(200).send(responseStr);
   });
    
   connection.end();
});


app.listen(port, function(){
    console.log('Sample mySQL app listening on port ' + port);
});