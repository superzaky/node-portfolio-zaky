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
                    role: "admin"
                },
                {
                    _id: ObjectId("000000000000000000000002"),
                    name: "Peter Parker",
                    username: "peter",
                    password: "open",
                    role: "user"
                },
                {
                    _id: ObjectId("000000000000000000000003"),
                    name: "Tobi Naruto",
                    username: "tobi",
                    password: "open",
                    role: "guest"
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
                        {link: "http://myimages.com/myimage04.png"}
                    ],
                    roles: [
                        {name: "user"}
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
                    roles: [
                        {name: "user"},
                        {name: "guest"}
                    ],
                    projectType: "Desktop"
                },
                {
                    _id: ObjectId("000000000000000000000003"),
                    user: "000000000000000000000001",
                    name: "project table",
                    content: "some project about a table.",
                    views: 0,
                    images: [ 
                        {link: "http://myimages.com/myimage06.png"}
                    ],
                    roles: [
                        {name: "user"}
                    ],
                    projectType: "Desktop"
                },
                {
                    _id: ObjectId("000000000000000000000004"),
                    user: "000000000000000000000001",
                    name: "project fruit",
                    content: "some project about fruit.",
                    views: 0,
                    images: [ 
                        {link: "http://myimages.com/myimage03.png"}, 
                        {link: "http://myimages.com/myimage04.png"}
                    ],
                    roles: [
                        {name: "user"},
                        {name: "guest"}
                    ],
                    projectType: "App"
                },
                {
                    _id: ObjectId("000000000000000000000005"),
                    user: "000000000000000000000001",
                    name: "project tv",
                    content: "some project about tv.",
                    views: 0,
                    images: [ 
                        {link: "http://myimages.com/myimage12.png"}, 
                    ],
                    roles: [
                        {name: "user"}
                    ],
                    projectType: "App"
                },                
                {
                    _id: ObjectId("000000000000000000000006"),
                    user: "000000000000000000000001",
                    name: "project fruit",
                    content: "some project about fruit.",
                    views: 0,
                    images: [ 
                        {link: "http://myimages.com/myimage03.png"}, 
                        {link: "http://myimages.com/myimage04.png"}
                    ],
                    roles: [
                        {name: "user"}
                    ],
                    projectType: "App"
                }
            ]
        }, function (err, data) {
            // data is an array of all the documents created 
        });
    }
};

module.exports = data;
