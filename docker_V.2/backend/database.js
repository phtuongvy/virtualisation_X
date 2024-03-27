const mariadb = require('mariadb');



const pool  = mariadb.createPool({
  host: '51.83.36.122/phppgadmin', // ou l'adresse IP du serveur de la base de données
  user: 'nunric', // votre nom d'utilisateur pour se connecter à la base de données
  password: '01jgvs', // le mot de passe associé à votre utilisateur
  database: 'nunric' ,// le nom de votre base de données
  connectionLimit: 5
});

async function getConnection() {
    console.log("dans la fonction get conection ");
    try {
        const connection = await pool.getConnection();
        console.log("Connecté à la base de données MariaDB !");
        return connection;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = getConnection;