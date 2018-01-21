require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user searches projects", function () {
    var token = "";
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
                        role: "admin",
                        token: res.body.token
                    };
                    token = res.body.token;
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });

    it('should get 1 project at /api/projects?search=Bike GET', function (done) {
        //calling PROJECT api
        server
                .get('/api/projects?search=Bike')
                .set('Authorization', 'Bearer ' + token)
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    // console.log("res stringfy obj  = "+JSON.stringify(res.body, null, 4));
                    var data = {
                        totalItems: 6,
                        items:  [
                            {
                                _id: "000000000000000000000002",
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
                                projectType: "Desktop",
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
