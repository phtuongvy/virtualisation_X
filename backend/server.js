const express = require("express")
const getConnection = require('./database');
const app = express()


app.use(express.json())

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const bookmark = [
    {
        firstname: "ty",
        lastname: "1",
        tel: "0781708238"
    },
    {
        firstname: "Vy",
        lastname: "Can fion",
        tel: "0604030201"
    },
    {
        firstname: "Evan",
        lastname: "Lamy",
        tel: "0102030405"
    },
]

app.get("/addContact", (req , res) =>{ 
    bookmark.push(req.query)
    res.json({ok : true})
})

app.get("/bookmark", (rep,res)=> res.json(bookmark))

app.get("/delete", (rep, res)=>{

    bookmark.splice(rep.query.index,1)
    res.json({ ok: true})
})


app.get("/test",async  (rep, res)=> {
    let conn;
    console.log("je suis dans test");
    try {
        conn = await getConnection();
        console.log(conn); 
    } catch (err) {
        console.error(err);
    } finally {
        if (conn) conn.end(); // Libère la connexion
    }
})

async function queryExample() {
    let conn;
    console.log("1_lancement de la bases");
    try {
        conn = await getConnection();
        console.log(conn); 
    } catch (err) {
        console.error(err);
    } finally {
        if (conn) conn.end(); // Libère la connexion
    }
}

queryExample();

app.listen(7728, () => {
    console.log('Serveur démarré sur le port 7728');
  });