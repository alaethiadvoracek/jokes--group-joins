const express = require( 'express' );
const app = express();
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const port = process.env.PORT || 5000;

// use bodyParser.urlencoded throughout the app with this:
app.use(bodyParser.urlencoded({ extended: true }));


// serve back static files
app.use(express.static('server/public'));

// routes
// require in the route module
const jokesRouter = require('./routes/joke.router');

// define a route
app.use('/jokes', jokesRouter);

app.listen(port, function(){
  console.log('server running on: ', port);
}); // end spin up server
