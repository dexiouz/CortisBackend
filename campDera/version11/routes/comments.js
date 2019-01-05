let express = require("express"),
  router  = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment    = require("../models/comments"),
  middlewareObj = require("../middleware/index")

// Add New Comment
router.get("/new", middlewareObj.isLoggedIn,(req,res)=>{
  Campground.findById( req.params.id, ( err, campground )=>{
    if(err){
      console.log( err )
    } else {
      res.render("comments/new", {campground})
    }
  })
});

//Create new comment
router.post("/", middlewareObj.isLoggedIn, ( req, res) => {
  Campground.findById( req.params.id, ( err, campground )=>{
    if( err ){
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      Comment.create( req.body.comment, ( err, comment) => {
        if( err ){
          req.flash("error", `Something went wrong: ${err}`)
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
          req.flash("success", `Successfully added comment.`)
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  })
});

//Comments edit route
router.get("/:comment_id/edit",middlewareObj.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        res.redirect("back")
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
      }
    })
});

//Comment put request
router.put("/:comment_id",middlewareObj.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if(err){
      res.redirect("back")
    } else{
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
});

//Comment delete route
router.delete("/:comment_id",middlewareObj.checkCommentOwnership, (req,res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if(err){
      res.redirect("back")
    } else {
      req.flash("success", `Comment deleted.`)
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})



module.exports = router;