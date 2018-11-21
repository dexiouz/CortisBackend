let express = require( "express" );
let app = express();
let request = require( "request" );

app.set( "view engine", "ejs")

app.get('/', (req, res)=>{
  res.render("search")
});

app.get( '/results', (req, res) => {
  let search = req.query.search;
  let url = `http://www.omdbapi.com/?s=${search}&apikey=b052c23`
  request( url, ( error, response, body ) => {
    if( !error && response.statusCode == 200) {
      let data = JSON.parse( body ); 
      res.render( "results", { data }); 
    }
   })
});




app.listen( 3000, ()=> {
  console.log("movie server started")
})