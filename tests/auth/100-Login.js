require('../utils');
require('events').EventEmitter.prototype._maxListeners = 100;

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin

describe("A user logs in", function () {
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
                    console.log("json stringfy res body TESTs = "+JSON.stringify(res.body, null, 4));
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

    it('should display a SINGLE session on /api/auth/ GET', function (done) {
        //We check if a session is created by sending a GET request to /api/auth
        // console.log("json stringfy res token TESTs = "+JSON.stringify(token, null, 4));
        server
                .get('/api/auth/')
                .set('Authorization', 'Bearer ' + token)
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
    
    it('should delete a SINGLE session on /api/auth/logout GET', function (done) {
        server
                .post('/api/auth/login')
                .send({
                    logout: true
                })
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
        server
                .get('/api/auth/')
                .set('Authorization', 'Bearer ' + token)
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

require('events').EventEmitter.prototype._maxListeners = 0;
