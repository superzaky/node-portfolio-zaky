require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user gets projects", function () {
    it('should create a SINGLE session on /api/auth/login POST', function (done) {
        //calling LOGIN api
        server
                .post('/api/auth/login')
                .send({
                    username: "jimmy",
                    password: "open"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    var data = {
                        _id: "000000000000000000000001",
                        name: "Jimmy Doe",
                        username: "jimmy",
                        admin: false
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });

    it('should get a SINGLE project on /api/projects/ GET', function (done) {
        //calling PROJECT api
        server
                .get('/api/projects')
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log("res " + res.body);
                    
                    var data = {
                        totalItems: 6,
                        items: [
                            {
                                _id: "000000000000000000000001",
                                user: "000000000000000000000001",
                                name: "project fruit",
                                content: "some project about fruit.",
                                views: 0,
                                images: [ 
                                    {link: "http://myimages.com/myimage03.png"}, 
                                    {link: "http://myimages.com/myimage04.png"}, 
                                ],
                                projectType: "App",
                                __v: 0
                            },
                            {
                                _id: "000000000000000000000002",
                                user: "000000000000000000000001",
                                name: "project bike",
                                content: "some project about a bike.",
                                views: 0,
                                images: [ 
                                    {link: "http://myimages.com/myimage05.png"}
                                ],
                                projectType: "Desktop",
                                __v: 0
                            },
                            {
                                _id: "000000000000000000000003",
                                user: "000000000000000000000001",
                                name: "project table",
                                content: "some project about a table.",
                                views: 0,
                                images: [ 
                                    {link: "http://myimages.com/myimage06.png"}
                                ],
                                projectType: "Desktop",
                                __v: 0
                            },
                            {
                                _id: "000000000000000000000004",
                                user: "000000000000000000000001",
                                name: "project fruit",
                                content: "some project about fruit.",
                                views: 0,
                                images: [ 
                                    {link: "http://myimages.com/myimage03.png"}, 
                                    {link: "http://myimages.com/myimage04.png"}, 
                                ],
                                projectType: "App",
                                __v: 0
                            },               
                            {
                                _id: "000000000000000000000006",
                                user: "000000000000000000000001",
                                name: "project fruit",
                                content: "some project about fruit.",
                                views: 0,
                                images: [ 
                                    {link: "http://myimages.com/myimage03.png"}, 
                                    {link: "http://myimages.com/myimage04.png"}, 
                                ],
                                projectType: "App",
                                __v: 0
                            }
                        ]
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);

                    done();
                });
    });
});