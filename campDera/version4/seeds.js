let mongoose = require("mongoose"),
  Comment = require("./models/comment"),
  Campground = require("./models/campground");


data = [
  {
    name: "East Camp",
    image: '/assets/mbuntu-2.jpg',
    description: "blah blah blah"
  },
  {
    name: "north Camp",
    image: '/assets/mbuntu-3.jpg',
    description: "blah blah blah"
  },
  {
    name: "west Camp",
    image: '/assets/mbuntu-4.jpg',
    description: "blah blah blah"
  },
]
function seedDB() {
  // REMMOVE CAMPGROUND
  Campground.remove({}, (err) => {
    err ?   
      console.log( err ) : 
        console.log("Campgrounds removed");

    //CREATE CAMPGROUND
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        err ? 
          console.log(err) :  
          console.log("added a new campground")
        
        //CREATE NEW COMMENT
        Comment.create({
          text: "Thus an avenue to find exceeding pleasure",
          author: "chidera"
        }, ( err, comment ) => {
          err ? 
            console.log( err ) :  
              campground.comments.push( comment );
              campground.save();
              console.log( "created new comment" );
        });
      })
    })

  })


};

module.exports = seedDB;

