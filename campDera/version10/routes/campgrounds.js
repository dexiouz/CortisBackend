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
   newCamp          = { name, image, description, author  };
  // create new camp ground and save to db
  Campground.create( newCamp, function( err, newlyCreated ){
    if(err){
      console.log(err)
    } else {
      // redirect back to campground page
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

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", (req, res) => {
  // is user logged in?
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, (err, foundCampground) => {
      if(err){
        res.redirect("/campgrounds")
      } else {
        // does user own the campground? 
       if(foundCampground.author.id.equals(req.user._id)){
         res.render("campgrounds/edit", {campground: foundCampground})
       } else {
         res.send("You do not have permission")
       }
      }
    })
  } else {
    res.send("You need to login")
  }
})
//UPDATE CAMPGROUND ROUTE
router.put("/:id", (req, res) => {
  req.body.campground.image = `/assets/${req.body.campground.image}`
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if(err){
      console.log(err)
    } else {
      console.log(updatedCampground)
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
});

// DSTROY CAMPGROUND ROUTE
router.delete("/:id", (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds")
    }
  })
})
// isLoggedIn function
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}

module.exports = router;