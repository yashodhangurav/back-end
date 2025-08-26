const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("connect sucessfully")
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = mongoose.Schema({
    title: {
        type : String,
        required : true, //required means just like a NOT NULL (sql)
        maxLength :20,
    },
    author: {
        type : String,
    },
    price: {
        type : Number,
        min : 1
    },
    discount : {
        type : Number,
        default : 0,
    },
    category : {
        type  : String,
        enum : ["fiction","non-fiction"]
    },
    genre : [String],
    
})

//now creating model

const Book = mongoose.model("Book" , bookSchema);

// Schema Validation update
Book.findByIdAndUpdate('68ac62021d33984b060d09ec', 
    {price : -100}, 
    {runValidators : true})/* ` This helps ensure that the data being updated meets the validation criteria specified in the schema. */
    .then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err)
});



// let book1 = new Book({
//     title: "marvel comic v2",
//     price : 600,
//     category : "fiction",
//     genre : ["comics", "superheros", "fiction"]
// })
// book1.save().then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })
