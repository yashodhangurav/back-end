const mongoose = require('mongoose');
const Chat = require("./models/chat.js"); //requiring chat from the model folder

//connection set-up
main().then((res)=>{
    console.log("connection successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); //server using whatsapp named database
}

//inserting many

let allChats = [
    {
        from : "yashodhan",
        to : "vijay",
        msg : "hey there ?",
        created_at : new Date() 
    },
    {
        from : "suraj",
        to : "omkar",
        msg : "can send me todays lectures notes ?",
        created_at : new Date() 
    },
    {
        from : "bob",
        to : "tony",
        msg : "they are not friends now",
        created_at : new Date() 
    },
    {
        from : "pooja",
        to : "neha",
        msg : "why you asking me about that girl ?",
        created_at : new Date() 
    },
    {
        from : "vijay",
        to : "yashodhan",
        msg : "Iam find boy , how are you ?",
        created_at : new Date() 
    },
    {
        from : "shankar",
        to : "suresh",
        msg : "hello buddy , shall we go to the gokak tommorow?",
        created_at : new Date() //genrate nre random date 
    },
]
Chat.insertMany(allChats);

