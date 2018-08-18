
/*prints array of objects*/
  //   results.toArray((err, resultsArray) => {
  //         if (err) throw err;
  //   console.log("results.toArray: ", resultsArray);
  // });
"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Refactored and wrapped as new, tweet-specific function:

  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("#1 Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet.user.name);
    }

    console.log('------------')
    console.log("#2 Logging each tweet:");
    for (let i in tweets) {
      console.log(tweets[i].user.name);
    }


    db.close();
  });

});
