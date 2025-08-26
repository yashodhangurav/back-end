const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "delta_app",
    password : "Yashu@591302"
});

let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password()
    ];   
  }

  //Home route.
  app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) AS total FROM user`;  // ✅ added alias 'total'
        connection.query(q, (err, result) => {
            if (err) {
                console.error("DB Error:", err);   // ✅ better error logging
                return res.send("Some error in DB");
            }
    
            let count = result[0].total;  // ✅ use alias 'total' show get total number of users faker data
            res.render("home.ejs", { count });  // ✅ pass count to ejs
        });
});


 //Show route
 app.get("/user", (req,res)=>{
    let q = `SELECT * FROM user`;
    connection.query(q, (err, users) => { //we here rename the "result" argu as a "users" 
        if (err) {
            console.error("DB Error:", err);   // ✅ better error logging
            return res.send("Some error in DB");
        }
        res.render("showusers.ejs", { users });  // ✅ pass "users" argu to ejs
    });
 });


 //Edit route
 app.get("/user/:id/edit", (req,res)=>{
    let {id} = req.params; //we are exstracting id from "req.params" to findout the user info to get us older username and all thing
    let q = `SELECT * FROM user WHERE id='${id}'` /* .This query is used to fetch the information of a specific user based on their `id` for the edit route in the application. */
    connection.query(q, (err, result) => { //we here rename the "result" argu as a "users" 
        if (err) {
            console.error("DB Error:", err);   // ✅ better error logging
            return res.send("Some error in DB");
        }
        let user = result[0];
        res.render("edit.ejs", { user });  // ✅ pass "users" argu to "edit.ejs"
    });
 });

 //update route
app.patch("/user/:id", (req,res)=>{ //when we use any variable as routr such as (id) then we need to extract that from req.params so we can use them in next steps
    let {id} = req.params; 
    let q = `SELECT * FROM user WHERE id='${id}'`;
    let {password : formPass , username : newUsername} = req.body; //here we are renaming password and username as formPass and newUsername, they are comming from edit.ejs file
    connection.query(q, (err, result) => {  
        if (err) {
            console.error("DB Error:", err);   
            return res.send("Some error in DB");
        }
        let user = result[0];
        if(formPass != user.password){
            res.send("WRONG password")
        } else {
            let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`; //here we are using another query for update username if pasword was correct
            connection.query(q2, (err, result) => {  
                if (err) {
                    console.error("DB Error:", err);   // ✅ better error logging
                    return res.send("Some error in DB");
                }
                res.redirect("/user");
            });
        }
       
    });
});

app.listen("3000", ()=>{
    console.log(`listening the port 3000`);
});

