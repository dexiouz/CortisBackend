let express     = require("express"),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express();

    // APP CONFIG
    mongoose.connect("mongodb://localhost/blogApp")
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use( bodyparser.urlencoded({ extended: true }));


    // MONGOOSE/MODEL CONFIG
    // CREATE SCHEMA FOR BLOG
    let blogSchema = new mongoose.Schema({
      title: String,
      image: String,
      body: String,
      Date: { type: Date, default: Date.now },
    });

    // COMPILE INTO A MODEL
    let Blog = mongoose.model("Blog", blogSchema );

    // CREATE A BLOG
    // Blog.create({
    //   title: "Test blog",
    //   image: "mbuntu-1",
    //   body: "This is a new blog"
    // })

    // RESTFUL ROUTES
    app.get( '/blogs', ( req, res )=> {
          res.render( "index" )
    });











    app.listen( 3000, () => console.log( "blog server is lisening "))