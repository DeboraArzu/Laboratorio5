var MongoClient = require('mongodb').MongoClient, format = require('util').format;

MongoClient.connect('mongodb://localhost:27017', function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("Connected");
    }
    db.close();
})