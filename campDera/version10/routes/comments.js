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
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  })
});

//Comments edit route
router.get("/:comment_id/edit", (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        console.log(err)
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
      }
    })
});

//Comment put request
router.put("/:comment_id", (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if(err){
      console.log(err)
    } else{
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
} )

// isLoggedIn function
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}

module.exports = router;