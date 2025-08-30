const mongoose = require("mongoose");
const initData = require("./data.js"); //this is an Object 
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
//creating function to connect mongodb by using mongoose
async function main() {
    await mongoose.connect(MONGO_URL);
}

//calling function main() which is thennable function
main()
    .then(()=>{ console.log("connected to db")})
    .catch((err)=>{console.log(err)});

const initDB = async() => {
    await Listing.deleteMany({}); //deleting the previous example data from the DB
    await Listing.insertMany(initData.data);//inserting the new data to the DB , "we extracted data from initData object"
    console.log("data was initialized")
}
initDB(); //calling the initData function