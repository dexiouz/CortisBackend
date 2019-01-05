let express = require("express"),
  router  = express.Router({ mergeParams: true }),
  middlewareObj = require("../middleware/index"),
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
router.get( "/new",middlewareObj.isLoggedIn, ( req, res) => {
  res.render("campgrounds/new")
});

//CREATE -- ADD NEW CAMPGROUND TO DB
router.post( '/',middlewareObj.isLoggedIn, ( req, res)=> {
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
router.get("/:id/edit",middlewareObj.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit",  {campground: foundCampground});
  })
})
//UPDATE CAMPGROUND ROUTE
router.put("/:id",middlewareObj.checkCampgroundOwnership, (req, res) => {
  req.body.campground.image = `/assets/${req.body.campground.image}`
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if(err){
      console.log(err)
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
});

// DSTROY CAMPGROUND ROUTE
router.delete("/:id",middlewareObj.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds")
    }
  })
})

module.exports = router;