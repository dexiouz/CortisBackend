let express = require("express"),
  router  = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment    = require("../models/comments")

// Add New Comment
router.get("/new", isLoggedIn,(req,res)=>{
  Campground.findById( req.params.id, ( err, campground )=>{
    if(err){
      console.log( err )
    } else {
      res.render("comments/new", {campground})
    }
  })
});

//Create new comment
router.post("/",isLoggedIn, ( req, res) => {
  Campground.findById( req.params.id, ( err, campground )=>{
    if( err ){
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      Comment.create( req.body.comment, ( err, comment) => {
        if( err ){
          console.log( err )
        } else {
          // console.log(req.body.comment)
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
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