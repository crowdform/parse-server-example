//Import the mongoose module
var mongo = require('mongodb-bluebird');

//Set up default mongoose connection
var mongoDB = 'mongodb://heroku_ktjkrlqt:i20ph0t1bon3vh065sgr9td3hu@ds123662.mlab.com:23662/heroku_ktjkrlqt';

//Get the default connection
var db;

mongo.connect(mongoDB).then( (database) => {
  // ... start the server
  db = database;
  console.log("MongoDB Connected");
  console.log('Query');
  db.collection("Venue").find().then(function(docs) {
    console.log(docs);
  });
}).catch((err) => {
  console.error("No Database Connection");
});

export default (req, res) => {
  return res.json({
    result: false
  })
}
