let mongoose = require("mongoose"),
    Post = require("./models/post.js"),
    User = require("./models/user.js");
mongoose.connect("mongodb://localhost/reference_demo");


// User.create({ 
//   email: "person@gmail.com",
//   name: " person newPerson"
// })


// CREATE A POST AND REFERENCE IT TO A USER

// Post.create({
//   title: "A model of the sun",
//   content: "Consider the beauty of diversity"
// }, ( err, post ) => {
//   User.findOne({ email: "person@gmail.com"}, ( err, foundUser ) => {
//     err ? console.log( err ) 
//     : foundUser.posts.push( post );
//       foundUser.save(( err, data ) => {
//         err ? console.log( err )
//         : console.log( data )
//       })
//   })
// })


// FIND USER WITH ALL OF ITS POSTS

User.findOne({ email: "person@gmail.com"}).populate( "posts" ).exec(( err, user ) => {
  err ? console.log( err ) :
   console.log( user )
})

