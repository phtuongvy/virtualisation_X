const express = require("express")
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



app.listen(7728)