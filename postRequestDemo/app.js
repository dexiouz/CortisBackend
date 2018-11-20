let express = require("express");
let app = express();
let bodyparser = require( "body-parser" );
console.log(bodyparser)

app.use( bodyparser.urlencoded( { extended: true } ));
app.set("view engine", "ejs");





app.get( "/", ( req,res )=> {
  res.render("home")
})

app.get( "/friends", ( req,res )=> {
  let friends = [ "George", "Bernadine", "Ezekiel" ]
  res.render( "friends", { friends } )
})

app.post( "/addFriend", ( req,res ) => {
//  let newFriend = req.body.newFriend;
 console.log(  req.body.newfriend )
//  friends.push( newFriend ); 
  res.send( "You have reached the post route" )
})





app.listen( 3000, ()=>{
  console.log("server started")
})