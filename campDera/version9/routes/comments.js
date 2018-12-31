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
          // add  id to comment
          comment.author.id = req.user._id;
            // add  username to comment
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          console.log(comment);
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