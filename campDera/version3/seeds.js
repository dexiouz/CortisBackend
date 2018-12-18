let mongoose = require("mongoose");
let Campground = require("./models/campground");

function seedDB(){
  Campground.remove({}, (err) => {
    if(err){
      console.log(err)
    }
    console.log( "Campgrounds removed" )
  })
};

module.exports = seedDB;

