let 
 express    = require("express"),
 app          = express(),
 mongoose     = require("mongoose"),
 bodyparser   = require( "body-parser" ),
 passport     = require("passport"),
 LocalStrategy = require("passport-local"),
 Campground   = require("./models/campground"),
 Comment      = require("./models/comments"),
 User         = require("./models/user"),
 seedDB       = require("./seeds");

//require routes
let 
  commentRoutes    = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes      = require("./routes/index");


mongoose.connect("mongodb://localhost:/campDera8",{ useNewUrlParser: true })
app.use( bodyparser.urlencoded( { extended: true } ));
app.use( express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
//seedDB(); //seed the database

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

//pass in an object to every route
app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  next();
})

//middleware for using imported routes
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);


// port
app.listen( 3000, ()=>{
  console.log( "The camp server has started" )
})