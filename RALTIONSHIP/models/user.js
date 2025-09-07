const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(()=>{
    console.log("connection sccesssfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


// creating schema
const userSchema = new Schema({
    username : String,
    addresses : [
        {
            _id : false, // to remove _id field from subdocument
            location : String,
            city: String
        },
    ],
});
const User = mongoose.model("User", userSchema); // creating model


// adding data
const addusers = async () => {
    let user1 = new User({
        username : "sherlockholmes",
        addresses : [
            {
                location : "221B Baker Street",
                city: "London"
            },
    ],
    });
    user1.addresses.push({location : "10 Downing Street", city : "London"});
    let result = await user1.save();
    console.log(result)
};

addusers();