let mongoose = require("mongoose"),
Campground  =require("./models/campground"),
Comment     = require("./models/comments");

data = [
  {
    name: "East Camp",
    image: '/assets/mbuntu-2.jpg',
    description:"Lorem ipsum dolor sit amet,. Donec laoreet tincidunt sollicitudin erat. Proin sagittis turpis semper purus.Phasellus ut consectetur mauris sodales. Donec vel ligula eu erat. Sed dui lectus, varius eget. Nam sed magnaurna in. Lorem ipsum dolor sit amet,. Donec laoreet tincidunt sollicitudin erat. Proin sagittis turpis semper purus. Phasellus ut consectetur mauris sodales. Donec vel ligula eu erat. Sed dui lectus, varius eget. Namsed magna urna in."
  },
  {
    name: "north Camp",
    image: '/assets/mbuntu-3.jpg',
    description:  "Lorem ipsum dolor sit amet,. Donec laoreet tincidunt sollicitudin erat. Proin sagittis turpis semper purus.Phasellus ut consectetur mauris sodales. Donec vel ligula eu erat. Sed dui lectus, varius eget. Nam sed magnaurna in. Lorem ipsum dolor sit amet,. Donec laoreet tincidunt sollicitudin erat. Proin sagittis turpis semper purus. Phasellus ut consectetur mauris sodales. Donec vel ligula eu erat. Sed dui lectus, varius eget. Namsed magna urna in."
  },
 



  {
    name: "west Camp",
    image: '/assets/mbuntu-4.jpg',
    description: "Lorem ipsum dolor sit amet,. Donec laoreet tincidunt sollicitudin erat. Proin sagittis turpis semper purus.Phasellus ut consectetur mauris sodales. Donec vel ligula eu erat. Sed dui lectus, varius eget. Nam sed magnaurna in. Lorem ipsum dolor sit amet,. Donec laoreet tincidunt sollicitudin erat. Proin sagittis turpis semper purus. Phasellus ut consectetur mauris sodales. Donec vel ligula eu erat. Sed dui lectus, varius eget. Namsed magna urna in."
  },
]
function seedDB(){
  //Removed Campgrounds
  Campground.deleteMany({}, (err) => {
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