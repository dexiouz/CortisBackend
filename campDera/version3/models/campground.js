let mongoose = require("mongoose")

// SETUP SCHEMA
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

module.exports = mongoose.model("Campground", campgroundSchema );