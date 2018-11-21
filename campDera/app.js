let express = require("express");
let app = express();

app.use( express.static( "public"));
app.set("view engine", "ejs");

app.get("/", ( req, res)=>{
  res.render( "landing" )
})

app.get( '/campgrounds', ( req, res )=> {
  let campgrounds = [
    {name: "Eastern camp", image: '/assets/mbuntu-1.jpg'},
    {name: "Western camp", image: '/assets/mbuntu-2.jpg'},
    {name: "Northern camp", image: '/assets/mbuntu-3.jpg'},
    {name: "Southern camp", image: '/assets/mbuntu-4.jpg'}
  ];

  res.render( "campgrounds", { campgrounds })
})

app.listen( 3000, ()=>{
  console.log( "The camp server has started" )
})