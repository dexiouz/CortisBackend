let express = require( 'express');
let app = express();

app.use( express.static("public"));
app.set("view engine", "ejs");

app.get('/', (req,res) => {
  res.render('home')
});

app.get('/fallinlove/:thing', ( req, res ) => {
  let thing = req.params.thing;
  res.render("love", { thing })
})

app.get('/posts', ( req,res )=>{
  let posts = [
    { title: "posts 1", author: "Chidera"},
    { title: "my adorable pet is James", author: "Paul" },
    { title: "can you come out", author: "Christian" }
  ]
  res.render( "posts", { posts }); 
})

app.listen(3000, function(){
  console.log('EJS demo is running')
})