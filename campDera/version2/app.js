let express    = require("express"),
 app          = express(),
 mongoose     = require("mongoose"),
 bodyparser   = require( "body-parser" );

 mongoose.connect("mongodb://localhost:/campDera")
app.use( bodyparser.urlencoded( { extended: true } ));
app.use( express.static("public"));
app.set("view engine", "ejs");

// SETUP SCHEMA
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

let Campground = mongoose.model("Campground", campgroundSchema );


// Campground.create(
//   {
//     name: "Western camp", 
//     image: '/assets/mbuntu-2.jpg',
//     description: "This is a camp on the western side of Nigeria. It has a beautiful scene with lush vegetation."
//   },function(err,camp){
//     if(err){
//       console.log(`${err}, There was an error`)
//     } else {
//       console.log("NEWLY CREATED CAMPGRIUND")
//       console.log(camp)
//     }
//   })


app.get("/", ( req, res)=>{
  res.render( "landing" )
})

// INDEX -- SHOW ALL CAMPGROUNDS
app.get( '/campgrounds', ( req, res )=> {
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log( err )
    } else {
      res.render( "campgrounds", { campgrounds: allCampgrounds })
    }
  })
});

//CREARE -- ADD NEW CAMPGROUND TO DB
app.post( '/campgrounds', ( req, res)=> {
  // get data from form and add to newCamp object
  let name = req.body.name;
  let incomingImage = req.body.image;
  let image = `/assets/${incomingImage}`
  let newCamp = { name, image };
  
  // create new camp ground and save to db
  Campground.create(newCamp, function( err, newlyCreated){
    if(err){
      console.log(err)
    } else {
      // redirect back to campground page
      res.redirect("/campgrounds")
    }
  })
});

// NEW -- SHOW FORM TO CREATE NEW CAMPGROUND
app.get( "/campgrounds/new", ( req, res) => {
  res.render("new")
});

// SHOW A CAMPGROUND USING ITS ID
app.get("/campgrounds/:id", ( req, res) => {
  res.send("THIS WILL BE THE SHOw PAGE ONE DAY")
})

app.listen( 3000, ()=>{
  console.log( "The camp server has started" )
})