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
            ],
            Project: [
                {
                    _id: ObjectId("000000000000000000000001"),
                    user: "000000000000000000000001",
                    name: "project fruit",
                    content: "some project about fruit.",
                    views: 0,
                    images: [ 
                        {link: "http://myimages.com/myimage03.png"}, 
                        {link: "http://myimages.com/myimage04.png"}, 
                    ],
                    projectType: "App"
                },
                {
                    _id: ObjectId("000000000000000000000002"),
                    user: "000000000000000000000001",
                    name: "project bike",
                    content: "some project about a bike.",
                    views: 0,
                    images: [ 
                        {link: "http://myimages.com/myimage05.png"}
                    ],
                    projectType: "Desktop"
                }
            ]
        }, function (err, data) {
            // data is an array of all the documents created 
        });
    }
};

module.exports = data;
