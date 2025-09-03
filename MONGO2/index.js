const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js"); //requiring chat from the model folder
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

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


app.get("/", (req,res)=>[
    res.send("root route")
]);

//index route
app.get("/chats", asyncWrap(async(req,res,next)=>{
  
        let chats = await Chat.find();  //mongodb command to take all data from the database, and this is asynchrounous so we use await and async fun
    // console.log(chats);
    res.render("index.ejs", { chats })
}));

// new route
app.get("/chats/new", (req,res)=>{
    // throw new ExpressError(404,"Page not found");
    res.render("new.ejs")
})


// create route
app.post("/chats" , asyncWrap(async (req,res,next)=>{
 
        let {from , to , msg} = req.body; //extracting all values from the 'new.ejs' which is coming from the 'req.body' because 'post' req
        let newChat = new Chat({ //creating a new chat and saving incoming values from the new.ejs
            from : from,
            to : to,
            msg : msg,
            created_at : new Date()
        });
        await newChat.save() //saving the new chat
        res.redirect("/chats"); 
}))

/**
 * The function `asyncWrap` is a higher-order function that wraps an asynchronous function to handle
 * any errors that may occur during its execution.
 * param fn - The `fn` parameter in the `asyncWrap` function is a function that returns a Promise. In
 * this case, it is the asynchronous function that you want to wrap with error handling using
 * `asyncWrap`.
 * returns The `asyncWrap` function is returning a new function that wraps the original function `fn`
 * passed to it. This new function handles asynchronous operations by catching any errors that occur
 * during the execution of `fn`.
 */
function asyncWrap(fn){
    return function(req,res,next) {
        fn(req,res,next).catch((err)=> next(err))
    }
};

// NEW show route
app.get("/chats/:id", asyncWrap(async (req,res,next)=>{

        let {id} = req.params;
        let chat = await Chat.findById(id);
        if (!chat) {
            next ( new ExpressError(404,"chat not found") );
        }
        res.render("edit.ejs", {chat})    
})
);

// edit route
app.get("/chats/:id/edit", asyncWrap(async(req,res,next)=>{
        let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat })
    
}));

//update route
app.put("/chats/:id" , asyncWrap(async(req,res,next)=>{
        let { id } = req.params;
        let { newMsg } = req.body; //we extracting "newMsg named textarea" from the "edit.ejs" file
        //we are updating by using "findByIdAndUpdate" mongodb method given below
        let updatedChat = await Chat.findByIdAndUpdate(id,{ msg : newMsg}, {runValidator : true}, {new:true})
        console.log(updatedChat);
        res.redirect("/chats"); 
}))

// distrou route
app.delete("/chats/:id", asyncWrap(async(req,res,next)=>{

        let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
}))

//mongoose error ( simply to print name of the error)
const handleValidationErr = (err)=>{
    console.log("This  was a validation error please follow the rules.")
    console.dir(err.message);
    return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name === "ValidationError"){
       err = handleValidationErr(err)
    }
    next(err);
})
//----------------------------------------------------- Error handling middleware
app.use((err, req, res, next)=>{
    let {status = 500, message="some error occured"} = err;
    res.status(status).send(message);
})
app.listen(3000, ()=>{
    console.log(`server listening the port ${3000}`)
});