

let express = require( 'express' );
let app = express();

app.get('/', ( req,res ) => {
  res.send( "hello Chidera");
});

app.get('/dogs', ( req,res) => {
  console.log( ' someone made a request to /dogs ')
  res.send( 'a dog is here' )
});

app.get( '/:subreddit', ( req,res ) => {
  let subreddit =  req.params.subreddit 
  res.send( `Welcome to ${subreddit} subreddit` );
  
})


app.get( '/:subreddit/comments/:id/:title', ( req,res ) => {
  let 
    subreddit =  req.params.subreddit,
    id = req.params.id,
    title = req.params.title;
  res.send(`This is a subreddit that has ${subreddit.toUpperCase()} and comments and an id of ${id} and a title of ${title.toUpperCase()}`)
});

app.get( '/speak/:animal', ( req,res ) => {
  let sounds = {
    pig: "oink",
    cow: "moo",
    cat: "I hate you humans"
  },

  animal = req.params.animal.toLowerCase();
  let sound = sounds[animal];
  res.send( sound )
});

app.get( '/repeat/:message/:times', ( req, res ) => {
  console.log( req.params);
  let 
    message = req.params.message,
    times = Number( req.params.times ),
    result = '';
      for ( let i = 0; i < times; i++){
        result += `${message} `
      };
      res.send( result )
});
















app.get( '*', (req,res) =>{
  res.send( "you are a star" )
})
app.listen(3000, function(){
  console.log( "Express is listening")
});

