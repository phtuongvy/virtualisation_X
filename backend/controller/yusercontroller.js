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
function login(req, res) {
    var connection = mysql.createConnection(connectionOptions);
    var queryStr = 'SELECT * FROM `YUSER` WHERE `YUSERNAME` = ? AND `YUSERPASSWORD` = ?';

    connection.connect();   
    connection.query(queryStr, [req.body.YUSERNAME, req.body.YUSERPASSWORD], function (error, results, fields) {
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }    
       if (results.length == 0) {
          res.status(404).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
          return;
       }    
       // Peut-être afficher le résultat pour le débogage, mais soyez prudent avec les informations sensibles
       console.log('Résultat de la requête:', results); 
       res.status(200).json(results);
    });

    connection.end();
}

// Fonction d'inscription
function register(req, res) {
    var connection = mysql.createConnection(connectionOptions);

    console.log(req.body)
    
    req.body.YUSERPREMIUM = 0;
    req.body.YUSERROLE = 'YUSER';
    
    var queryStr = 'INSERT INTO `YUSER` (`YUSERID`, `YUSERPSEUDO`, `YUSERNAME`, `YUSERBIRTHDAY`, `YUSERPASSWORD`, `YUSERROLE`, `YUSERPREMIUM`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    connection.connect();
    
    connection.query(queryStr, [req.body.YUSERID, req.body.YUSERPSEUDO, req.body.YUSERNAME, req.body.YUSERBIRTHDAY, req.body.YUSERPASSWORD, req.body.YUSERROLE, req.body.YUSERPREMIUM], function (error, results, fields) {
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }
      
       res.status(200).json({ message: "Utilisateur enregistré avec succès" });
    });
   
    connection.end();
}

function getyuser(req, res) {
    
    var connection = mysql.createConnection(connectionOptions);
    var queryStr = 'SELECT * FROM `YUSER`';
 
    connection.connect();
 
    connection.query(queryStr, function (error, results, fields) {
 
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }
 
       if (results.length == 0) {
          res.status(404).json({ message: "Aucun utilisateur trouvé" });
          return;
       }
 
       res.status(200).json(results);
    });
 
    connection.end();
}

module.exports = { login, register,getyuser };