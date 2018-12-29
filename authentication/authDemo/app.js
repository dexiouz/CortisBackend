let
  express = require("express");
  mongoose = require("mongoose"),
  app = express();


mongoose.connect("mongodb://localhost/auth_demo"); 




  app.set("view engine", "ejs")

app.get("/", ( req, res )=>{
  res.render("home")
});

app.get("/secret", ( req, res )=>{
  res.render("secret")
});

app.listen( 4000, () => {
  console.log( "auth server running")
})