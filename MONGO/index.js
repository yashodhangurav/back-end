const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("connect sucessfully")
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({ 
    name : String, //defining the type of any schema is a part of schema validation rule.
    email : String,
    age : Number,
})

const User = mongoose.model("User", userSchema);

//------------------------------------------------------update
/* The code `User.findOneAndUpdate({name: "bruce"}, {age : 42}, {new : true})` is updating a document
in the MongoDB collection associated with the `User` model. */

// User.findOneAndUpdate({name: "bruce"}, {age : 42}, {new : true}) 
// .then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })
User.findOneAndDelete({name:"eve"}).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
});

//--------------------------------------------------------find
// User.findOne({_id : "68ab298f275b238e3b7c9e59"}).then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// });


// //insertMany giving us promise
// User.insertMany([
//     {name:"Tony", email:"tony@gmail.com", age:30},
//     {name:"eve", email:"eve@gmail.com", age:22},
//     {name:"bruce", email:"bruce@gmail.com", age:42},
// ]) .then((data)=>{
//     console.log(data)
// })

// const user1 = new User({
//     name : "adam",
//     email : "adam@gmail.com",
//     age : 48
// });
// const user2 = new User({
//     name : "eve",
//     email : "eve@gmail.com",
//     age : 45
// });

// // user1.save();

// user2
// .save()
// .then((res) =>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// });