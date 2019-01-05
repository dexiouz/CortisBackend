let 
  Campground = require("../models/campground"),
  Comment  = require("../models/comments");

//all the middleware goes here
let middlewareObj = {};

// checkCampgroundOwnership
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, (err, foundCampground) => {
      if(err){
        req.flash("error", "Campground not found")
        res.redirect("back")
      } else {
        // does user own the campground? 
       if(foundCampground.author.id.equals(req.user._id)){
         next()
       } else {
         req.flash("error", "You don't have permission to do that.")
        res.redirect("back")
       }
      }
    })
  } else {
    req.flash("error", "You need to be logged in to do that.")
    res.redirect("back")
  }
}

// checkCommentOwnership
middlewareObj.checkCommentOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        res.redirect("back")
      } else {
        // does user own the campground? 
       if(foundComment.author.id.equals(req.user._id)){
         next()
       } else {
        req.flash("error", "You don't have permission to do that.")
        res.redirect("back")
       }
      }
    })
  } else {
    req.flash("error", "You need to be logged in to do that.")
    res.redirect("back")
  }
}

// check if logged in
middlewareObj.isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in.");
  res.redirect("/login")
}
module.exports = middlewareObj;