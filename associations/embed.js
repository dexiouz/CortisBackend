let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/association_demo");


// POST SCHEMA
let postSchema = new mongoose.Schema({
  title: String,
  content: String
});
// POST MODEL
let Post = mongoose.model("Post", postSchema)

// USER SCHEMA
let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [ postSchema ]
});
//USER MODEL
let User = mongoose.model("User", userSchema )



// CREATE A NEW USER EMBEDDED WITH POST
// let newUser = new User({
//   name: "Chidera Paul",
//   email: "chidera@gmail.com"
// })

// newUser.posts.push({ 
//   title: "The eclipse of the sun",
//   content: "The eclipse of the sun, much like the eclipse of the moon is something that was considered mythical..."
// })
// newUser.save( ( err, user ) => {
//   err ?
//     console.log(err) :
//       console.log( user )
// })

//FIND A USER
User.findOne({ name: "Chidera Paul" }, ( err, user ) => {
  err ?
   console.log(err) :
    user.posts.push({ 
      title: "The secret of life",
      content: "Life in itself is something that have not been clearly understood in a long while. Some philosophers claim that.."
    });
    user.save(( err, user) => {
      err ?
      console.log(err) :
         console.log( user )
    })
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