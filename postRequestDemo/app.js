let express = require("express");
let app = express();
let bodyparser = require( "body-parser" );

app.use( bodyparser.urlencoded( { extended: true } ));
app.set("view engine", "ejs");


let friends = [ "George", "Bernadine", "Ezekiel" ]



app.get( "/", ( req,res )=> {
  res.render("home")
})

app.get( "/friends", ( req,res )=> {
  res.render( "friends", { friends } )
})

app.post( "/addfriend", ( req,res ) => {
 let newfriend =   req.body.newfriend;
 friends.push( newfriend );
  res.redirect( "/friends" )
})





app.listen( 3000, ()=>{
  console.log("server started")
})