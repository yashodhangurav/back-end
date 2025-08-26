const express = require("express");
const app = express();
const port = 3000;

const path = require("path");

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

//creating instagram ejs 
// app.get("/ig/:username",(req,res)=>{
//     const followers = ["yashodhan","vijay","omkar","prajwal"];
//     let {username} = req.params;
//     res.render("instagram.ejs", {username , followers});
// })
app.get("/ig/:username",(req,res)=>{
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data){
        res.render("instagram.ejs", {data});
    } else {
        res.render("error.ejs")
    }
   
})

app.get("/home",(req,res)=>{
    res.send("hello");
});

//rolldice path
app.get("/rolldice",(req,res)=>{
    let dicevalue =  Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs" , {dicevalue} )
});

app.listen(port , ()=>{
    console.log(`app listening the port ${port} `);
});

