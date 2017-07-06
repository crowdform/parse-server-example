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
  // console.log('Query');
  // db.collection("Venue").find().then(function(docs) {
  //   console.log(docs);
  // });
}).catch((err) => {
  console.error("No Database Connection");
});

export default (req, res) => {
  // Find properties on Monday that are open between 10am and 1pm

  // the mega query
  // query location
  // query types
  // query dates from day of week and then opening hours

  const Venue = db.collection("Venue");
  const Spaces = db.collection("Space");

  //

  Venue.find({
    availability: {
      $elemMatch : {
        "day": "0",
        "to" : { $lte: 600},
        "from": { $gte: 960},
      }
    }
  }, { _id: 1 }).then(function(venues) {
    // parse pointer fix
    const venueArr = venues.map(function(venue){ return 'Venue$' + venue._id; });
    // find spaces matching the query
    console.log(venueArr);
    return Spaces.find({
      "_p_venue": {
        $in : venueArr
      }
    }, { _p_venue: 1 });
  }).then((spaces) => {
    console.log('Spaces', spaces);
    // find the venues from available spaces
    const venueArr = spaces.map(function(item){ return  item._p_venue.replace('Venue$', ''); });
    // remove duplicates
    const venues = venueArr.filter( function( item, index, inputArray ) {
          return inputArray.indexOf(item) == index;
    });
    return venues;
  }).then((result) => {
    // return full list of venues again
    console.log('Venues with space', result)
    Venue.find({
      _id: {   $in : result }
    }).then((results) => {
      return res.json({
        results
      })
    });
  });

}
