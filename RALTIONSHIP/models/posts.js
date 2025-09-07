const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(()=>{
    console.log("connection sccesssfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


// creating  user schema
const userSchema = new Schema({
  username : String,
  email: String
});

const postSchema = new Schema({
    content : String,
    likes : Number,
    user : {
        type : Schema.Types.ObjectId,       // to store object id of user (refrence) just like foreign key in sql
        ref : "User"                       // refering user model
    }
});

const User = mongoose.model("User", userSchema); // creating model
const Post = mongoose.model("Post", postSchema);

// inserting data 
const addData = async () => {
    // let user1 = new User({
    //     username : "yashodhan",
    //     email : "yashodhan@gmail.com"
    // });

    // let post1 = new Post({
    //     content : "my first post",
    //     likes : 120
    // })
    // post1.user = user1; // referencing user in post

    // await user1.save();
    // await post1.save();




    // let user1 = await User.findOne({username : "yashodhan"});   // finding user to refrence in post
    // let post2 = new Post({          // creating new post
    //     content : "bye bye",
    //     likes : 52,
    // })
    // post2.user = user1;         
    // post2.save();
    // console.log(post2);

    let res = await Post.find({}).populate("user");
    console.log(res);
};

addData();