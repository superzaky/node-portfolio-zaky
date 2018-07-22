require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin

describe("A user logs in with wrong credentials", function () {
    it('should NOT create a SINGLE session on /api/auth/login POST', function (done) {
        //calling LOGIN api
        server
                .post('/api/auth/login')
                .send({
                    username: "jimmy",
                    password: "openz"
                })
                .expect("Content-type", /json/)
                .expect(400)
                .end(function (err, res) {
                    var data = "Invalid username or password";
                    res.status.should.equal(400);
                    assert.deepEqual(res.body, data);
                    done();
                });

    });

    it('should NOT display a SINGLE session on /api/auth/ GET', function (done) {
        //We check if a session is created by sending a GET request to /api/auth
        server
                .get('/api/auth/')
                .expect("Content-type", /json/)
                .expect(404)
                .end(function (err, res) {
                    var data = "Token not found";
                    res.status.should.equal(404);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
