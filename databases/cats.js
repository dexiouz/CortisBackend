let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app")

let catSchema = ({
  name: String,
  age: Number,
  temperament: String
});

let Cat = mongoose.model( "Cat",  catSchema )

// let george = new Cat({
//   name: "mrs nora",
//   age: 7,
//   temperament: "evail"
// });

// george.save( function( err, cat ){
//   if( err ){
//     console.log(" SOMETHIN WENT WRONG")
//   } else {
//     console.log("WE JUST SAVED A CAT")
//     // console.log( cat );
//     console.log( george )
//    }
// })


// create a new cat using .create
//  Cat.create({
//   name: "Snow blue",
//   age: 8,
//   temperament: "qiup",
// }, function( err, cat){
//   if( err ){
//     console.log(`${err}, Could not save..`)
//   } else {
//     console.log("success");
//     console.log(cat);
//   }
// });

Cat.find({}, function( err, cats ){
  if(err){
    console.log("Could not find cats");
    console.log(err);
  } else {
    console.log("cats......");
    console.log( cats )
  }
})
