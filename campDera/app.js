let express = require("express");
let app = express();
let bodyparser = require( "body-parser" );

app.use( bodyparser.urlencoded( { extended: true } ));


app.use( express.static("public"));


app.set("view engine", "ejs");

let campgrounds = [
  {name: "Eastern camp", image: '/assets/mbuntu-1.jpg'},
  {name: "Western camp", image: '/assets/mbuntu-2.jpg'},
  {name: "Northern camp", image: '/assets/mbuntu-3.jpg'},
  {name: "Southern camp", image: '/assets/mbuntu-4.jpg'},
  {name: "Eastern camp", image: '/assets/mbuntu-1.jpg'},
  {name: "Western camp", image: '/assets/mbuntu-2.jpg'},
  {name: "Northern camp", image: '/assets/mbuntu-3.jpg'},
  {name: "Eastern camp", image: '/assets/mbuntu-1.jpg'},
  {name: "Western camp", image: '/assets/mbuntu-2.jpg'},
  {name: "Northern camp", image: '/assets/mbuntu-3.jpg'},
];


app.get("/", ( req, res)=>{
  res.render( "landing" )
})

app.get( '/campgrounds', ( req, res )=> {
  res.render( "campgrounds", { campgrounds: campgrounds })
});

app.post( '/campgrounds', ( req, res)=> {
  let name = req.body.name;
  let incomingImage = req.body.image;
  let image = `/assets/${incomingImage}`
  let newCamp = { name, image, };

  console.log(image)
  campgrounds.push( newCamp );
  res.redirect("/campgrounds")
  res.send( "YOU HIT THE POST ROUTE")
});

app.get( "/campgrounds/new", ( req, res) => {
  res.render("new")
})

app.listen( 3000, ()=>{
  console.log( "The camp server has started" )
})