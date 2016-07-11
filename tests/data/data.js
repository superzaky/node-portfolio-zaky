var fixtures = require('node-mongoose-fixtures');
var ObjectId = require('mongodb').ObjectID;

var data = {
    insertFixtures: function () {
        // Create dataset immediately 
        fixtures({
            User: [
                {
                    _id: ObjectId("000000000000000000000001"),
                    name: "Jimmy Doe",
                    username: "jimmy",
                    password: "open",
                    admin: false
                }
            ]
        }, function (err, data) {
            // data is an array of all the documents created 
        });
    }
};

module.exports = data;
