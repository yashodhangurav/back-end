const mongoose = require("mongoose");
const Schema = mongoose.Schema;/* ` By using `mongoose.Schema`, you can create a new schema object that defines the shape of documents within a collection in your MongoDB database. */

const listingSchema = new Schema ({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image: {
        type : String,
       /* in the `imag` field of the Mongoose schema is setting a default value for the `imag` field. */
        default: "https://unsplash.com/photos/people-cycling-on-a-road-between-modern-buildings-pJ_yqFKXHds", 
        /* The `set` property in Mongoose schema allows you to define a custom setter function for a
        specific field. In this case, the `set` function is checking if the value `v` being set for
        the `imag` field is an empty string `""`. If it is empty, it sets the value to "default
        link", otherwise it keeps the original value `v`. This is a way to provide a default value
        for the `imag` field if an empty string is passed during the creation or update of a
        document. */
        set : (v)=> v === "" ?"https://unsplash.com/photos/people-cycling-on-a-road-between-modern-buildings-pJ_yqFKXHds": v, //this consition is just for client
    },
    price : Number,
    location : String,
    country : String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
