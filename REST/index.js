const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const { v4: uuidv4 } = require('uuid'); //we can see how to use this uuid on npm wbsite
const methodOverride = require("method-override");


app.use(express.urlencoded({express:true})); //we need to tell express which type of data post request handle
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));

let posts = [
    {
        id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        username : "yashu",
        content : "rhymes rhythem reason"
    },
    {
        id: uuidv4(),
        username : "shubham",
        content : "shavidevata is my devata and im happy to have them , so nithing to say much about my god i guess everybody knows hims very well!"
    },
    {
        id: uuidv4(),
        username : "sunny",
        content : "my god is juses is the best he will gave me a lot then i deserv, so im glad to have my god in my back"
    }
];

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts}); //here we send posts arr to the "index.ejs" file to use them
})
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs")
})
app.post("/posts", (req,res)=>{
    let {username, content} = req.body; //here username and content extracted form "req.body" which is names of the tags , and "form" tag method is "post"
    let id = uuidv4(); // for the new post which we created for such post we giving unique id , so that we can use "see in detail" achor tag
    posts.push({id , username , content}); //we are adding username and content to the existing array as a object keys 
    res.redirect("/posts");
})

app.get("/posts/:id", (req,res)=>{ //this route is set as achor tag (see in details) in index.ejs file
    let {id} = req.params; //every variables extracted from req.params
    let post = posts.find((p)=> id === p.id); //p is aeguement, post consider as a single post
    console.log(post)
    res.render("show.ejs", {post}); // we are sending post as variable to the show.ejs file
})

app.get("/posts/:id/edit", (req,res)=>{ //this route set in index.ejs file using achor tag (edit)
    let {id} = req.params;  //every post have unique "id" so after clicking edit option redirected to that perticular post
    let post = posts.find((p)=> id === p.id); //extracted single post from the posts using unique "id"
    res.render("edit.ejs", {post} ); //every post we give the same post edit but that differentiate by using the "id"
})

app.patch("/posts/:id", (req,res)=>{ //we here use "patch" request but we can't use directly "patch" from the ejs/frontend side so we use "post" request in "edit.ejs" file
    let {id} = req.params;
    let newContent = req.body.content; //after the "post" request submmited from the "edit.ejs" file then edited content data comes from the "req.body.content" such data saved in "newContent" variable
    let post = posts.find((p)=> id === p.id); //"p.id" means post is a object and "id" is one of key of the property
    post.content = newContent;
    console.log(post)
    res.redirect("/posts")
})

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params; //we are deleting the posts by sing id
     posts = posts.filter((p) => id !== p.id); //here we filter the id's by deleting perticular after the delete form submmited
    res.redirect("/posts");
})

app.listen(port , ()=>{
    console.log(`listening the port ${port}`);
})
