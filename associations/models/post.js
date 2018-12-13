
let mongoose = require("mongoose");
// POST SCHEMA
let postSchema = new mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model("Post", postSchema );