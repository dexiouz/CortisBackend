let mongoose = require("mongoose");
// USER SCHEMA
let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
});

module.exports = mongoose.model("User", userSchema );