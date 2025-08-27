const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js"); //requiring chat from the model folder
const methodOverride = require("method-override");

app.set("views", path.join(__dirname , "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

//connection set-up
main().then((res)=>{
    console.log("connection successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); //server using whatsapp named database
}

//index route
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();  //mongodb command to take all data from the database, and this is asynchrounous so we use await and async fun
    // console.log(chats);
    res.render("index.ejs", { chats })
});

// new route
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs")
})
app.get("/",(req,res)=>{
    res.send("home page");
});

// create route
app.post("/chats" , (req,res)=>{
    let {from , to , msg} = req.body; //extracting all values from the 'new.ejs' which is coming from the 'req.body' because 'post' req
    let newChat = new Chat({ //creating a new chat and saving incoming values from the new.ejs
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    });

    newChat.save() //saving the new chat
    .then((res)=>{console.log("chat was saved")}) //when we are using "then & catch" then we no need to specify the "async and await" function
    .catch((err)=>{err});

    res.redirect("/chats");
});

// edit route
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat })
})

//update route
app.put("/chats/:id" , async(req,res)=>{
    let { id } = req.params;
    let { newMsg } = req.body; //we extracting "newMsg named textarea" from the "edit.ejs" file
    //we are updating by using "findByIdAndUpdate" mongodb method given below
    let updatedChat = await Chat.findByIdAndUpdate(id,{ msg : newMsg}, {runValidator : true}, {new:true})
    console.log(updatedChat);
    res.redirect("/chats");
})

// distrou route
app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.listen(3000, ()=>{
    console.log(`server listening the port ${3000}`)
});