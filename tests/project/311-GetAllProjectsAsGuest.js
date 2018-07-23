require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("311 - A guest gets projects", function () {
    var token = "";
    it('should create a SINGLE session on /api/auth/login POST', function (done) {
        //calling LOGIN api
        server
                .post('/api/auth/login')
                .send({
                    username: "tobi",
                    password: "open"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    var data = {
                        _id: "000000000000000000000003",
                        name: "Tobi Naruto",
                        username: "tobi",
                        role: "guest",
                        token: res.body.token
                    };
                    token = res.body.token;
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
    
    it('should get a SINGLE project on /api/projects/ GET', function (done) {
        //calling PROJECT api
        server
                .get('/api/projects')
                .set('Authorization', 'Bearer ' + token)
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    // console.log("res stringfy  = " +JSON.stringify(res.body, null, 4));
                    var data = {
                        totalItems: 6,
                        items: [
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
                            },
                            {
                                _id: "000000000000000000000004",
                                user: "000000000000000000000001",
                                name: "project strawberry",
                                content: "some project about strawberry.",
                                views: 0,
                                images: [ 
                                    {link: "http://myimages.com/myimage03.png"}, 
                                    {link: "http://myimages.com/myimage04.png"}, 
                                ],
                                roles: [
                                    {name: "user"},
                                    {name: "guest"}
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
