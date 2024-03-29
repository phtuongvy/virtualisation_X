// Importation des modules nécessaires
var mysql = require('mysql');
var express = require('express');

// Initialisation d'Express
var app = express();
// Définition du port sur lequel le serveur va écouter. Utilise une variable d'environnement ou un port par défaut.
var port = process.env.PORT || 8005;

// Chaîne de connexion pour la base de données MySQL
var mysqlHost = process.env.MYSQL_HOST || 'localhost';
var mysqlPort = process.env.MYSQL_PORT || '3306';
var mysqlUser = process.env.MYSQL_USER || 'root';
var mysqlPass = process.env.MYSQL_PASS || 'root';
var mysqlDB   = process.env.MYSQL_DB   || 'x_database';

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

 app.get('/comment', function(req, res) {
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `COMMENT`';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({error: "Une erreur interne est survenue"});
        return;
      }
     
     if(results.length == 0) {
        res.status(404).json({message: "Aucun commentaire trouvé"});
        return;
     }

     // Transforme les résultats en un format plus lisible / structuré si nécessaire
     // Cela est juste un exemple, vous pouvez choisir de renvoyer `results` directement
     res.status(200).json(results);
   });
    
   connection.end();
});


app.get('/followers',function(req,res){
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `FOLLOWERS` ORDER BY `FOLLOWERS`.`FOLLOWERSID` DESC';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({error: "Une erreur interne est survenue"});
        return;
      }
     
     if(results.length == 0) {
        res.status(404).json({message: "Aucun follower trouvé"});
        return;
     }

     // Transforme les résultats en un format plus lisible / structuré si nécessaire
     res.status(200).json(results);
   });
    
   connection.end();
});

app.get('/following', function(req, res) {
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `FOLLOWING` ORDER BY `FOLLOWING`.`FOLLOWINGID` DESC';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({error: "Une erreur interne est survenue"});
        return;
      }
     
     if(results.length == 0) {
        res.status(404).json({message: "Aucune donnée de suivi trouvée"});
        return;
     }

     // Pas besoin de reformater si le résultat est déjà dans le format désiré
     res.status(200).json(results);
   });
    
   connection.end();
});

app.get('/liked', function(req, res) {
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `LIKED` ORDER BY `POSTID` DESC';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({error: "Une erreur interne est survenue"});
        return;
      }
     
     if(results.length == 0) {
        res.status(404).json({message: "Aucun like trouvé"});
        return;
     }

     res.status(200).json(results);
   });
    
   connection.end();
});

app.get('/media', function(req, res) {
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `MEDIA` ORDER BY `MEDIAID` DESC';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({error: "Une erreur interne est survenue"});
        return;
      }
     
     if(results.length == 0) {
        res.status(404).json({message: "Aucun média trouvé"});
        return;
     }

     res.status(200).json(results);
   });
    
   connection.end();
});

app.get('/posts', function(req, res) {
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `POST` ORDER BY `POSTID` DESC';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({error: "Une erreur interne est survenue"});
        return;
      }
     
     if(results.length == 0) {
        res.status(404).json({message: "Aucun post trouvé"});
        return;
     }

     res.status(200).json(results);
   });
    
   connection.end();
});

app.get('/saved', function(req, res) {
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `SAVED` ORDER BY `POSTID` DESC';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({error: "Une erreur interne est survenue"});
        return;
      }
     
     if(results.length == 0) {
        res.status(404).json({message: "Aucun élément sauvegardé trouvé"});
        return;
     }

     res.status(200).json(results);
   });
    
   connection.end();
});

app.get('/users', function(req, res) {
   
   var connection = mysql.createConnection(connectionOptions);
   var queryStr = 'SELECT * FROM `YUSER`';
   
   connection.connect();
 
   connection.query(queryStr, function (error, results, fields) {
     
      if (error) {
        console.error('Une erreur est survenue lors de la requête à la base de données:', error);
        res.status(500).json({error: "Une erreur interne est survenue"});
        return;
      }
     
     if(results.length == 0) {
        res.status(404).json({message: "Aucun utilisateur trouvé"});
        return;
     }

     res.status(200).json(results);
   });
    
   connection.end();
});

// Démarrage du serveur sur le port spécifié
app.listen(port, function(){
    console.log('Sample mySQL app listening on port ' + port);
});