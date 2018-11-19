let app = require('express')();

app.get('/', (req,res) => {
  res.render('home.ejs')
});

app.get('/fallinlove/:thing', ( req, res ) => {
  let thing = req.params.thing;
  res.render("love.ejs", { thing })
})

app.listen(3000, function(){
  console.log('EJS demo is running')
})