// Importation des modules nécessaires
var mysql = require('mysql');
const express = require('express');


// Initialisation d'Express
const app = express();

app.use(express.json()); // Permet de parser les requêtes en JSON. C'est un middleware pour Express.

// Importation des contrôleurs. 
const YuserController = require('./controller/yusercontroller'); 
const PostController = require('./controller/postcontroller'); 
const LikedController = require('./controller/likedcontroller'); 
const SavedController = require('./controller/savedcontroller'); 
const CommentController = require('./controller/commentcontroller'); 
const FollowerController = require('./controller/followerscontroller'); 
const FollowingController = require('./controller/followingcontroller'); 
const MediaController = require('./controller/mediacontroller'); 

// Configuration pour éviter les erreurs CORS en autorisant les requêtes de n'importe quelle origine.
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   next();
});

// Définition du port.
const port = process.env.PORT || 8005;

// Paramètres de connexion à la base de données MySQL. 
const mysqlHost = process.env.MYSQL_HOST || 'localhost';
const mysqlPort = process.env.MYSQL_PORT || '3306';
const mysqlUser = process.env.MYSQL_USER || 'root';
const mysqlPass = process.env.MYSQL_PASS || 'root';
const mysqlDB = process.env.MYSQL_DB || 'x_database';

// Options de connexion à la base de données MySQL
const  connectionOptions = {
   host: mysqlHost,
   port: mysqlPort,
   user: mysqlUser,
   password: mysqlPass,
   database: mysqlDB
};

// Route racine envoyant le fichier index.html.
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

//------------------------------------------------------------//
//--------------Création des différentes routes --------------//
//------------------------------------------------------------//


// Routes pour la gestion des utilisateurs
app.post('/login', YuserController.login); // Authentification d'un utilisateur
app.post('/register', YuserController.register); // Enregistrement d'un nouvel utilisateur
app.get('/users', YuserController.getyuser); // Récupération de la liste des utilisateurs
app.get('/users/:id', YuserController.getuserById); // Récupération de la liste des utilisateurs

// Routes pour la gestion des posts
app.post('/posts', PostController.posts); // Création d'un nouveau post
app.get('/posts', PostController.getPost); // Récupération des posts
app.get('/posts/:userId/saved', PostController.getSavedPosts); // Récupération d'un post par son ID

// Routes pour la gestion des likes
app.post('/posts/:postid/like', LikedController.postsLiked); // Ajout d'un like à un post
app.get('/liked', LikedController.getLiked); // Récupération des posts likés

// Routes pour la gestion des sauvegardes
app.post('/posts/:postid/save', SavedController.postsSaved); // Sauvegarde d'un post
app.get('/saved', SavedController.getSaved); // Récupération des posts sauvegardés

// Routes pour la gestion des commentaires
app.post('/posts/:postid/comment', CommentController.postsComment); // Ajout d'un commentaire à un post
app.get('/comment', CommentController.getComment); // Récupération des commentaires

// Routes pour la gestion des abonnés
app.get('/followers', FollowerController.getFollowers); // Récupération des followers d'un utilisateur
app.get('/following', FollowingController.getFollowing); // Récupération des utilisateurs suivis

// Route pour la gestion des médias
app.get('/media', MediaController.getMedia); // Récupération des médias associés aux posts



// Démarrage du serveur sur le port spécifié
app.listen(port, function () {
   console.log('Sample mySQL app listening on port ' + port);
});