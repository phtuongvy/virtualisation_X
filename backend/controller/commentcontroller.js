// Charge le module MySQL pour Node.js
var mysql = require('mysql');

// Définit les options de connexion à la base de données MySQL
// Utilise les variables d'environnement si disponibles, sinon utilise les valeurs par défaut
var connectionOptions = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || 'root',
    database: process.env.MYSQL_DB || 'x_database'
};

// Fonction pour ajouter un commentaire à la base de données
function postsComment(req, res) {
    var connection = mysql.createConnection(connectionOptions);
    var queryStr = 'INSERT INTO `COMMENT` (`COMMENTID`, `POSTID`, `YUSERID`, `COMMENTDATE`, `COMMENTTEXT`) VALUES (?, ?, ?, ?, ?)';

    connection.connect();

    connection.query(queryStr, [null, req.body.POSTID, req.body.YUSERID, req.body.COMMENTDATE, req.body.COMMENTTEXT], function (error, results, fields) {
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }

       res.status(200).json({ message: "Commentaire enregistré avec succès" });
    });

   connection.end();
}

// Fonction pour récupérer les Comments de la base de données
function getComment(req, res) {
    
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `COMMENT`';

   connection.connect();

   connection.query(queryStr, function (error, results, fields) {

      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }

      if (results.length == 0) {
         res.status(404).json({ message: "Aucun commentaire trouvé" });
         return;
      }


      res.status(200).json(results);
   });

   connection.end();
}

// Exporte les fonctions pour qu'elles puissent être utilisées dans d'autres fichiers du projet
module.exports = { postsComment, getComment };