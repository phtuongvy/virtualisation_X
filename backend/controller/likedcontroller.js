// authController.js

var mysql = require('mysql');

// Options de connexion à la base de données MySQL
// Vous pouvez déplacer ces options dans un fichier de configuration séparé pour améliorer la modularité
var connectionOptions = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || 'root',
    database: process.env.MYSQL_DB || 'x_database'
};

// Fonction de connexion
function postsLiked(req, res) {
    var connection = mysql.createConnection(connectionOptions);
    var queryStr = 'INSERT INTO `LIKED` (`POSTID`, `YUSERID`) VALUES (?, ?)';
 
    connection.connect();
 
    connection.query(queryStr, [req.body.POSTID, req.body.YUSERID], function (error, results, fields) {
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }
 
       res.status(200).json({ message: "Publication aimée avec succès" });
    });
 
    connection.end();
}

function getLiked(req, res) {
    var connection = mysql.createConnection(connectionOptions);
    var queryStr = 'SELECT * FROM `LIKED` ORDER BY `POSTID` DESC';
 
    connection.connect();
 
    connection.query(queryStr, function (error, results, fields) {
 
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }
 
       if (results.length == 0) {
          res.status(404).json({ message: "Aucun like trouvé" });
          return;
       }
 
       res.status(200).json(results);
    });
 
    connection.end();
}



module.exports = { postsLiked, getLiked };