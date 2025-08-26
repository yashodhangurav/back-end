const express = require("express");
const app = express();
let port = 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/register", (req,res)=>{
    let {user , password} = req.query; //from GET request data comes through query string thats why we define "req.query"
    res.send(`standard GET response , welcome ${user}`);
});

app.post("/register", (req,res)=>{
    let {user , password} = req.body;
    res.send(`standard POST response , welcome ${user}`) //in POST request data send through request body
});

//we are here use data to send response , but in real life project we generally at back-end / server side we are used to store data in database
app.listen(port, ()=>{
    console.log(`listening the port ${port}`);
})
