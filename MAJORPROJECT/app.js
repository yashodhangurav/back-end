const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views") );
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; //"wanderlust" we mentioned is the our DB name

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

//validation for joi Schema middleware
const validateListing = (req,res,next)=>{  
    let {error} = listingSchema.validate(req.body); //validating req.body with listingSchema
    if(error){ //if there is an error in validation then we are throwing error
        let errMsg = error.details.map((el)=> el.message.join).join(",") //mapping through the error details and joining them with comma
        throw new ExpressError(400, error)
    } else{
        next();
    }
}

//index route
app.get("/listings", wrapAsync( async (req,res)=>{
    const allListings = await Listing.find();
    res.render("./listings/index.ejs", {allListings})
}));

//create route
app.get("/listings/new", (req,res)=>{
    res.render("./listings/new.ejs")
});

//show route
app.get("/listings/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing})
}));

//create route 
app.post("/listings", 
    validateListing, //validating the req.body with joi schema
    wrapAsync(async(req, res) => {
    const newListing = new Listing(req.body.listing);
     await newListing.save()  
}));


// edit route
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
}));

//update route
app.put("/listings/:id", 
    validateListing,
    wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}) //we are getting listing object from "req.body" coz we mentioned in edit.ejs that each tag names as 'listing[name]' and having post req to them
    res.redirect(`/listings/${id}`); //by giving id it will redirected to the "show route"
}));

// delete route
app.delete("/listings/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

// handle 404 err if no other route matches
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {statusCode, message});
})

app.listen(3000, ()=>{
    console.log("server is listening to port 3000")
});