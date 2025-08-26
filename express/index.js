const express = require("express")
const app = express(); //above express is function

// console.log(app); app is object
let port = 3000; //localhost:3000

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});

// ---------------------response
app.get('/',(req,res)=>{
    res.send("hello iam root");
});

// --------------------------------------------path parameter

// app.get("/:username/:id", (req,res) => {
//     let {username , id} = req.params;
//     let htmlstr = `<h1>hello welcome to the page of @${username}</h1>`
//     res.send(htmlstr);
// })

// --------------------------------query string

app.get("/search", (req,res)=>{
    let {q} = req.query;
    if(q==''){
        res.send("Nothing searched")
    }
    res.send(`here's the response of your search ${q}`)
})


app.get('/apple',(req,res)=>{
    res.send("you contacted apple path");
});

// app.get('/orange',(req,res)=>{
//     res.send("you contacted orange path");
// });

// // same as we can use POST req also
// app.post('/', (req,res)=>{
//     res.send("you send a post request to the root")
// });

// // if user search for path is doesnt existedclear , then we use below custom response
// app.all(/.*/, (req, res) => {
//     res.send("This page is not exist");
//    });


// // app.use((req,res)=>{
// //     // console.log(req);
// //     console.log("request received")
// //     let code = "<h1>Fruits</h1> <ul><li>apple</li><li>orange</li><li>kiwi</li></ul>"
// //     res.send(code)
// // })