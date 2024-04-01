// Importation des modules nécessaires
var mysql = require('mysql');
const express = require('express');

// Initialisation d'Express
const app = express();

app.use(express.json()); // for parsing application/json

// for CORS error

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   next();
});

// Définition du port sur lequel le serveur va écouter. Utilise une variable d'environnement ou un port par défaut.
var port = process.env.PORT || 8005;

// Chaîne de connexion pour la base de données MySQL
var mysqlHost = process.env.MYSQL_HOST || 'localhost';
var mysqlPort = process.env.MYSQL_PORT || '3306';
var mysqlUser = process.env.MYSQL_USER || 'root';
var mysqlPass = process.env.MYSQL_PASS || 'root';
var mysqlDB = process.env.MYSQL_DB || 'x_database';

// Options de connexion à la base de données MySQL
var connectionOptions = {
   host: mysqlHost,
   port: mysqlPort,
   user: mysqlUser,
   password: mysqlPass,
   database: mysqlDB
};

// Route racine qui envoie le fichier index.html au client
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});



// start page functionnalities

app.post('/login', function (req, res) {

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

      res.status(200).json(results);
   });

   connection.end();
});



app.post('/register', function (req, res) {
   var connection = mysql.createConnection(connectionOptions);
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
});

// home functionnalities

app.post('/posts', function (req, res) {
   var now = new Date().toISOString().slice(0, 19).replace('T', ' ');
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'INSERT INTO `POST` (`POSTID`, `YUSERID`, `POSTDATE`, `POSTDESCRIPTION`) VALUES (?, ?, ?, ?)';

   connection.connect();

   connection.query(queryStr, [null, req.body.YUSERID, now, req.body.POSTDESCRIPTION], function (error, results, fields) {
      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }

      res.status(200).json({ message: "Publication enregistrée avec succès" });
   });

   connection.end();
});


app.post('/posts/:postid/like', function (req, res) {
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
});

app.post('/posts/:yuserid/save', function (req, res) {
   console.log('Request body: ', req.body);
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'INSERT INTO `SAVED` (`YUSERID`, `POSTID`) VALUES (?, ?)';

   connection.connect();

   connection.query(queryStr, [req.body.YUSERID, req.body.POSTID], function (error, results, fields) {
      console.log('Connection options:', connectionOptions);  // Add this line
      console.log('Query string:', queryStr);  // Add this line
      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }

      res.status(200).json({ message: "Publication enregistrée avec succès" });
   });

   connection.end();
});



app.get('/comment', function (req, res) {

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

      // Transforme les résultats en un format plus lisible / structuré si nécessaire
      // Cela est juste un exemple, vous pouvez choisir de renvoyer `results` directement
      res.status(200).json(results);
   });

   connection.end();
});


app.get('/followers', function (req, res) {

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
});

app.get('/following', function (req, res) {

   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `FOLLOWING` ORDER BY `FOLLOWING`.`FOLLOWINGID` DESC';

   connection.connect();

   connection.query(queryStr, function (error, results, fields) {

      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }

      if (results.length == 0) {
         res.status(404).json({ message: "Aucune donnée de suivi trouvée" });
         return;
      }

      // Pas besoin de reformater si le résultat est déjà dans le format désiré
      res.status(200).json(results);
   });

   connection.end();
});

app.get('/liked', function (req, res) {

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
});

app.get('/media', function (req, res) {

   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `MEDIA` ORDER BY `MEDIAID` DESC';

   connection.connect();

   connection.query(queryStr, function (error, results, fields) {

      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }

      if (results.length == 0) {
         res.status(404).json({ message: "Aucun média trouvé" });
         return;
      }

      res.status(200).json(results);
   });

   connection.end();
});

app.get('/posts', function (req, res) {

   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `POST` ORDER BY `POSTID` DESC';

   connection.connect();

   connection.query(queryStr, function (error, results, fields) {

      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }

      if (results.length == 0) {
         res.status(404).json({ message: "Aucun post trouvé" });
         return;
      }

      res.status(200).json(results);
   });

   connection.end();
});

app.get('/saved', function (req, res) {

   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `SAVED` ORDER BY `POSTID` DESC';

   connection.connect();

   connection.query(queryStr, function (error, results, fields) {

      if (error) {
         console.error('Une erreur est survenue lors de la requête à la base de données:', error);
         res.status(500).json({ error: "Une erreur interne est survenue" });
         return;
      }

      if (results.length == 0) {
         res.status(404).json({ message: "Aucun élément sauvegardé trouvé" });
         return;
      }

      res.status(200).json(results);
   });

   connection.end();
});

app.get('/users', function (req, res) {

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
});

// Démarrage du serveur sur le port spécifié
app.listen(port, function () {
   console.log('Sample mySQL app listening on port ' + port);
});