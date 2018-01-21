require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A guest searches projects", function () {
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

    it('should get 0 projects at /api/projects?search=apple GET', function (done) {
        //calling PROJECT api
        server
                .get('/api/projects?search=apple')
                .set('Authorization', 'Bearer ' + token)
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    // console.log("res stringfy obj  = "+JSON.stringify(res.body, null, 4));
                    var data = {
                        totalItems: 6,
                        items:  [
                        ]
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
