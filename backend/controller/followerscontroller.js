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

// Fonction pour récupérer les followers de la base de données
function getFollowers(req, res) {

    var connection = mysql.createConnection(connectionOptions);
    var queryStr = 'SELECT * FROM `FOLLOWERS` ORDER BY `FOLLOWERS`.`FOLLOWERSID` DESC';
 
    connection.connect();
 
    connection.query(queryStr, function (error, results, fields) {
 
       if (error) {
          console.error('Une erreur est survenue lors de la requête à la base de données:', error);
          res.status(500).json({ error: "Une erreur interne est survenue" });
          return;
       }
 
       if (results.length == 0) {
          res.status(404).json({ message: "Aucun follower trouvé" });
          return;
       }
 
       // Transforme les résultats en un format plus lisible / structuré si nécessaire
       res.status(200).json(results);
    });
 
    connection.end();
}


// Exporte les fonctions pour qu'elles puissent être utilisées dans d'autres fichiers du projet
module.exports = { getFollowers };