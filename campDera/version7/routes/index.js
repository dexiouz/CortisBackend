let express = require("express"),
  router  = express.Router({ mergeParams: true }),
  User    = require("../models/user"),
  passport = require("passport")


//root route
router.get("/", ( req, res)=>{
  res.render( "landing" )
})


//show register form
router.get("/register", (req,res)=>{
  res.render("register")
})


//handle sign up logic
router.post("/register", (req,res)=>{
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user)=>{
    if(err){
      console.log(err)
      return res.render("register")
    }
    passport.authenticate("local")(req,res,()=>{
      res.redirect("/campgrounds")
    })
  })
});

//show login form
router.get("/login", (req,res)=>{
  res.render("login")
});

//handling login logic
router.post("/login",passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), (req,res)=>{
});

//logouit route
router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/campgrounds");
});

// isLoggedIn function
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}

module.exports = router;