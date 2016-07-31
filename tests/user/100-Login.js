require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin

describe("A user logs in", function () {
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

    it('should display a SINGLE session on /api/auth/ GET', function (done) {
        //We check if a session is created by sending a GET request to /api/auth
        server
                .get('/api/auth/')
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
    
    it('should delete a SINGLE session on /api/auth/logout GET', function (done) {
        //We check if a session is created by sending a GET request to /api/auth
        server
                .get('/api/auth/logout')
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {   
                    var data = "Successfully logged out";
                    res.status.should.equal(200);
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
                    var data = "Session not found";
                    res.status.should.equal(404);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
