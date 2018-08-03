require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user gets a project by ID", function () {
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
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });

    it('should get a SINGLE user on /api/users/000000000000000000000003 GET', function (done) {
        //calling USER api
        server
                .get('/api/users/000000000000000000000002')
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log("json stringfy  res  = "+JSON.stringify(res.body, null, 4));
                    var data = {
                        _id: "000000000000000000000002",
                        name: "Peter Parker",
                        username: "peter",
                        role: "user"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
