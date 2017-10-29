require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("An admin gets projects", function () {
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
                        role: "admin"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });

    it('should get a all users on /api/users/ GET', function (done) {
        //calling PROJECT api
        server
                .get('/api/users')
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    var data = {
                        totalItems: 5,
                        items: [
                            {
                                _id: "000000000000000000000001",
                                created_at: res.body.items[0].created_at, //created_at is dynamically created
                                updated_at: res.body.items[0].updated_at, //updated_at is dynamically created
                                name: "Jimmy Doe",
                                username: "jimmy",
                                password: res.body.items[0].password,
                                role: "admin",
                                __v: 0
                            },
                            {
                                _id: "000000000000000000000002",
                                created_at: res.body.items[1].created_at,
                                updated_at: res.body.items[1].updated_at,
                                name: "Peter Parker",
                                username: "peter",
                                password: res.body.items[1].password,
                                role: "user",
                                __v: 0
                            },
                            {
                                _id: "000000000000000000000003",
                                created_at: res.body.items[2].created_at,
                                updated_at: res.body.items[2].updated_at,
                                name: "Tobi Naruto",
                                username: "tobi",
                                password: res.body.items[2].password,
                                role: "guest",
                                __v: 0
                            },
                            {
                                _id: "000000000000000000000004",
                                created_at: res.body.items[3].created_at,
                                updated_at: res.body.items[3].updated_at,
                                name: "Rock Lee",
                                username: "rock",
                                password: res.body.items[3].password,
                                role: "guest",
                                __v: 0
                            },
                            {
                                _id: "000000000000000000000005",
                                created_at: res.body.items[4].created_at,
                                updated_at: res.body.items[4].updated_at,
                                name: "Gandalf",
                                username: "gandalf",
                                password: res.body.items[4].password,
                                role: "guest",
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
