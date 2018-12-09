let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/association_demo");


// POST SCHEMA
let postSchema = new mongoose.Schema({
  title: String,
  content: String
});
// POST MODEL
let Post = mongoose.model("Post", postSchema)

// UsSER SCHEMA
let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [ postSchema ]
});
//USER MODEL
let User = mongoose.model("User", userSchema )



//CREATE A NEW USER
let newUser = new User({
  name: "Chibuike Christian",
  email: "chrisroyalty@gmail.com"
})
newUser.save( ( err, user ) => {
  err ?
    console.log(err) :
      console.log( user )
})


// CREATE A NEW POST
  // let newPost = new Post({
  //   title: "Python language",
  //   content: "Python is a powerful language for AI"
  // })
  // newPost.save( (err, post ) => {
  //   err ?
  //     console.log( err ) :
  //       console.log( post)
  // })