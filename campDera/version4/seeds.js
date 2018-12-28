let mongoose = require("mongoose"),
Campground  =require("./models/campground"),
Comment     = require("./models/comments");

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
function seedDB(){
  //Removed Campgrounds
  Campground.remove({}, (err) => {
    if ( err ){
        console.log( err ) 
      }
        console.log("added a campground")
        //add new Campground
        data.forEach( seed => {
          Campground.create( seed, ( err, campground )=>{
            if ( err ){
              console.log( err ) 
            } else {
              console.log("added a campground")

              //crete a comment
              Comment.create(
                {
                  text: "Thus an avenue to find exceeding pleasure",
                  author: "chidera"
                }, ( err, comment)=>{
                  if(err){
                    console.log(err)
                  } else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log("created new comment ")
                  }
                })
            }
          })
        })
  })
}

module.exports = seedDB