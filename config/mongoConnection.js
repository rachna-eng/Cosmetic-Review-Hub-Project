var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const mongoConfig = {
    serverUrl: "mongodb://localhost:27017/",
    database: "CosmeticReviewHubDB"
};

let _connection = undefined;
let _db = undefined;

module.exports = async() => {
    if (!_connection) {
        _connection = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        _db = await _connection.db("CosmeticReviewHubDB");
    }

    return _db;
};