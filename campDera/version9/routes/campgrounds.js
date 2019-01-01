let express = require("express"),
  router  = express.Router({ mergeParams: true }),
  Campground = require("../models/campground");

// INDEX -- SHOW ALL CAMPGROUNDS
router.get( '/', ( req, res )=> {
  // console.log(req.user)
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log( err )
    } else {
      res.render( "campgrounds/index", 
        { 
          campgrounds: allCampgrounds, 
          currentUser: req.user
        })
    }
  })
});

// NEW -- SHOW FORM TO CREATE NEW CAMPGROUND
router.get( "/new",isLoggedIn, ( req, res) => {
  res.render("campgrounds/new")
});

//CREATE -- ADD NEW CAMPGROUND TO DB
router.post( '/',isLoggedIn, ( req, res)=> {
  // get data from form and add to newCamp object
let 
   name            = req.body.name,
   incomingImage    = req.body.image,
   image            = `/assets/${incomingImage}`,
   description      = req.body.description,
   author           = {
     id: req.user._id,
     username: req.user.username
   },
   newCamp          = { name, image, description,author  };
   console.log(req.user,"hi")
  // create new camp ground and save to db
  Campground.create( newCamp, function( err, newlyCreated ){
    if(err){
      console.log(err)
    } else {
      // redirect back to campground page
      console.log(newlyCreated)
      res.redirect("/campgrounds")
      
    }
  })
});


// SHOW A CAMPGROUND USING ITS ID
router.get("/:id", ( req, res) => {
  Campground.findById( req.params.id).populate("comments").exec((err, foundCampground) => {
    if(err){
      console.log( err)
    } else {
      res.render("campgrounds/show", {campground: foundCampground})
    }
  })
}); 

// isLoggedIn function
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}

module.exports = router;