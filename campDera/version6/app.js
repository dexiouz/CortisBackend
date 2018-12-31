let express    = require("express"),
 app          = express(),
 mongoose     = require("mongoose"),
 bodyparser   = require( "body-parser" ),
 passport     = require("passport"),
 LocalStrategy = require("passport-local"),
 Campground   = require("./models/campground"),
 Comment      = require("./models/comments"),
 User         = require("./models/user")
 seedDB       = require("./seeds");


mongoose.connect("mongodb://localhost:/campDera6",{ useNewUrlParser: true })
app.use( bodyparser.urlencoded( { extended: true } ));
app.use( express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "Chidera and secret",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", ( req, res)=>{
  res.render( "landing" )
})

// INDEX -- SHOW ALL CAMPGROUNDS
app.get( '/campgrounds', ( req, res )=> {
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log( err )
    } else {
      res.render( "campgrounds/index", { campgrounds: allCampgrounds })
    }
  })
});

//CREATE -- ADD NEW CAMPGROUND TO DB
app.post( '/campgrounds', ( req, res)=> {
  // get data from form and add to newCamp object
let name            = req.body.name,
   incomingImage    = req.body.image,
   image            = `/assets/${incomingImage}`,
   description      = req.body.description,
   newCamp          = { name, image, description };
  
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

// NEW -- SHOW FORM TO CREATE NEW CAMPGROUND
app.get( "/campgrounds/new", ( req, res) => {
  res.render("campgrounds/new")
});

// SHOW A CAMPGROUND USING ITS ID
app.get("/campgrounds/:id", ( req, res) => {
  Campground.findById( req.params.id).populate("comments").exec((err, foundCampground) => {
    if(err){
      console.log( err)
    } else {
      res.render("campgrounds/show", {campground: foundCampground})
    }
  })
}); 



//=================================
// COMMENTS ROUTES
// ================================
app.get("/campgrounds/:id/comments/new", isLoggedIn,(req,res)=>{
  Campground.findById( req.params.id, ( err, campground )=>{
    if(err){
      console.log( err )
    } else {
      res.render("comments/new", {campground})
    }
  })
});

app.post("/campgrounds/:id/comments", ( req, res) => {
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
})

//================
//AUTH ROUTES
//==============

//show register form
app.get("/register", (req,res)=>{
  res.render("register")
})


//handle sign up logic
app.post("/register", (req,res)=>{
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
app.get("/login", (req,res)=>{
  res.render("login")
});

//handling login logic
app.post("/login",passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), (req,res)=>{
});

//logouit route
app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/campgrounds");
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}
app.listen( 3000, ()=>{
  console.log( "The camp server has started" )
})