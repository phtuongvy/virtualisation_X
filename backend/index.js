// Importation des modules nécessaires
var mysql = require('mysql');
const express = require('express');


// Initialisation d'Express
const app = express();

app.use(express.json()); // for parsing application/json

const YuserController = require('./controller/yusercontroller'); // Assurez-vous que le chemin est correct
const PostController = require('./controller/postcontroller'); // Assurez-vous que le chemin est correct
const LikedController = require('./controller/likedcontroller'); // Assurez-vous que le chemin est correct
const SavedController = require('./controller/savedcontroller'); // Assurez-vous que le chemin est correct
const CommentController = require('./controller/commentcontroller'); // Assurez-vous que le chemin est correct
const FollowerController = require('./controller/followerscontroller'); // Assurez-vous que le chemin est correct
const FollowingController = require('./controller/followingcontroller'); // Assurez-vous que le chemin est correct
const MediaController = require('./controller/mediacontroller'); // Assurez-vous que le chemin est correct

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

app.post('/login', YuserController.login);

app.post('/register',YuserController.register);

// home functionnalities

app.post('/posts',PostController.posts);

app.post('/posts/:postid/like',LikedController.postsLiked);


app.post('/posts/:yuserid/save', SavedController.postsSaved);


app.post('/posts/:yuserid/comment', CommentController.postsComment);

app.get('/comment', CommentController.getComment);


app.get('/followers',FollowerController.getFollowers);

app.get('/following',FollowingController.getFollowing);

app.get('/liked', LikedController.getLiked);

app.get('/media', MediaController.getMedia);

app.get('/posts', PostController.getPost);

app.get('/saved', SavedController.getSaved);

app.get('/users', YuserController.getyuser);

// Démarrage du serveur sur le port spécifié
app.listen(port, function () {
   console.log('Sample mySQL app listening on port ' + port);
});