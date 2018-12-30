let
  User                  = require("./models/user")
  express               = require("express"),
  mongoose              = require("mongoose"),
  passport              = require("passport"),
  bodyParser            = require("body-parser");
  LocalStrategy         = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
  
 
mongoose.connect("mongodb://localhost/auth_demo",{ useNewUrlParser: true }); 

let app = express();
app.set("view engine", "ejs");

app.use(require("express-session")({
  secret: "Chidera is a fine man",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", ( req, res )=>{
  res.render("home")
});

app.get("/secret", ( req, res )=>{
  res.render("secret")
});

app.listen( 4000, () => {
  console.log( "auth server running")
})