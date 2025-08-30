const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require('ejs-mate');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views") );
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//creating function to connect mongodb by using mongoose
async function main() {
    await mongoose.connect(MONGO_URL);
}

//calling function main() which is thennable function
main()
    .then(()=>{ console.log("connected to db")})
    .catch((err)=>{console.log(err)});


app.get("/" , (req,res)=>{
    res.send("hi Iam root");
});

//index route
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find();
    res.render("./listings/index.ejs", {allListings})
});

//create route
app.get("/listings/new", (req,res)=>{
    res.render("./listings/new.ejs")
});

//show route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing})
})

//create route 
app.post("/listings", async (req,res)=>{  //this function becomes async because here we are doing changes in our database
    // let {title , description , image , price , location , country} = req.body; //instead of this line we can use below line by doing some changes in new.ejs names
    let newListing= Listing(req.body.listing); //updating new listing object in Listing model (as both are objects )
    await newListing.save(); //to save the new data in db
    res.redirect("/listings");
})

// edit route
app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
})

//update route
app.put("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}) //we are getting listing object from "req.body" coz we mentioned in edit.ejs that each tag names as 'listing[name]' and having post req to them
    res.redirect(`/listings/${id}`); //by giving id it will redirected to the "show route"
})

// delete route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})


app.listen(3000, ()=>{
    console.log("server is listening to port 3000")
});