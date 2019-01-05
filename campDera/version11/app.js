let 
 express    = require("express"),
 app          = express(),
 mongoose     = require("mongoose"),
 bodyparser   = require( "body-parser" ),
 passport     = require("passport"),
 LocalStrategy = require("passport-local"),
 Campground   = require("./models/campground"),
 flash      = require("connect-flash"),
 methodOverride = require("method-override"),
 User         = require("./models/user"),
 seedDB       = require("./seeds");

//require routes
let 
  commentRoutes    = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes      = require("./routes/index");


mongoose.connect("mongodb://localhost:/campDera10")
app.use( bodyparser.urlencoded( { extended: true } ));
app.use( express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(`${__dirname}/public`));
app.use(flash());
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
  res.locals.error     = req.flash("error");
  res.locals.success     = req.flash("success");
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