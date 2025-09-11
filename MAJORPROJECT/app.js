const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema } = require("./schema.js"); //importing joi schema from schema.js
const Review = require("./models/review.js");

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
    let {error} = listingSchema.validate(req.body); //here we are validating the req.body with the listingSchema and getting error object if there is any error
    if(error){              //if there is an error in validation then we are throwing error
        let errMsg = error.details.map((el)=> el.message).join(",") //mapping through the error details and joining them with comma
        throw new ExpressError(400, errMsg);
    } else{
        next(); //if there is no error then we are calling next() to proceed to the next middleware or route handler
    }
};

//validation for joi Schema middleware
const validateReview = (req,res,next)=>{  
    let {error} = reviewSchema.validate(req.body);                      //here we are validating the req.body with the listingSchema and getting error object if there is any error
    if(error){                                                        //if there is an error in validation then we are throwing error
        let errMsg = error.details.map((el)=> el.message).join(",")         //mapping through the error details and joining them with comma
        throw new ExpressError(400, errMsg);
    } else{
        next();                                                             //if there is no error then we are calling next() to proceed to the next middleware or route handler
    }
};
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
    const listing = await Listing.findById(id).populate("reviews"); //populate is used to get the reviews from the review collection by using the reference in listing model
    res.render("./listings/show.ejs", {listing})
}));

//create route 
app.post("/listings", 
    validateListing, //validating the req.body with joi schema
    wrapAsync(async(req, res) => {
    const newListing = new Listing(req.body.listing);
     await newListing.save() ;
     res.redirect("/listings");
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
    // console.log(deletedListing);
    res.redirect("/listings");
}));

//reviews
//post route
app.post("/listings/:id/reviews" , validateReview, wrapAsync(async (req,res)=> {                                   //when we store reviews in db then it will be asynchpronous operation so we are using async here
    let listing = await Listing.findById(req.params.id);                                    //finding the listing by id
    let newReview = new Review(req.body.review);                                        //creating new 'review object' from the req.body

    listing.reviews.push(newReview);                                                         //pushing the new review to the listing's review array which is defined in listing model
    await newReview.save();                                                                   //saving the new review to the db
    await listing.save();                                                                     //saving the updated listing to the db
    
    res.redirect(`/listings/${listing._id}`);                                               //redirecting to the show page of that listing
}));

// -----------------------------------------------------ERROR handling-----------------
// handle 404 err if no other route matches
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"} = err; //here we are giving default value to statusCode and message and giving the values from "err" object if it exists.
    res.status(statusCode).render("error.ejs", {message});
})

app.listen(3000, ()=>{
    console.log("server is listening to port 3000")
});