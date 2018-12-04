let express     = require("express"),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override"),
    // expressSanitizer = require("sanitizer")
    app         = express();

    // APP CONFIG
    mongoose.connect("mongodb://localhost/blogApp")
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use( bodyparser.urlencoded({ extended: true }));
    // app.use( expressSanitizer() )
    app.use(methodOverride("_method"))


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

    // RESTFUL ROUTES
    app.get( '/', ( req, res )=> {
      res.redirect("/blogs")
    });

    //INDEX ROUTE
    app.get( '/blogs', ( req, res )=> {
      Blog.find({}, (err, blogs)=>{
        if(err){
          console.log("there was an error", err)
        } else {
          // console.log(blogs)
          res.render("index", {blogs})
        }
      })
    });

    //NEW ROUTE
    app.get("/blogs/new", ( req,res )=>{
      res.render("new");
    });

    //CREATE ROUTE
    app.post("/blogs", (req,res)=>{
      // req.body.blog.body = req.sanitize( req.body.blog.body )
      Blog.create(req.body.blog, (err,newBlog)=>{
        if(err){
          res.render("new")
        }  else {
          res.redirect("/blogs")
        }
      })
    });

    //SHOW A BLOG BY ITS ID
    app.get( "/blogs/:id", (req, res)=> {
      Blog.findById( req.params.id, function( err, foundBlog){
        if( err ){
          res.redirect("/blogs")
        } else {
          res.render("show", { foundBlog})
        }
      })
    });

    // EDIT ROUTE
    app.get( "/blogs/:id/edit", ( req, res)=>{
      Blog.findById( req.params.id, ( err, foundBlog )=>{
        if( err ){
          res.redirect("/blogs")
        } else {
          res.render("edit", {foundBlog})
        }
      })
    });

    // UPDATE ROUTE
    app.put( "/blogs/:id", ( req, res)=>{
      // req.body.blog.body = req.sanitize( req.body.blog.body )
      Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
        err ?
          console.log( err )
            :
          res.redirect(`/blogs/${updatedBlog._id}`)
      })
    })


    // DELETE ROUTE
    app.delete( "/blogs/:id", ( req, res ) => {
      Blog.findByIdAndRemove( req.params.id, ( err) => {
        err ? 
         res.redirect("/blogs") 
        :
         res.redirect("/blogs")
      })
    })





    app.listen( 3000, () => console.log( "blog server is lisening "))