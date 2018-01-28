require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user creates a project", function () {
    var id = "asd";
    var token = "";
    it('should create a SINGLE session on /api/auth/login POST', function (done) {
        //calling LOGIN api
        server
                .post('/api/auth/login')
                .send({
                    username: "peter",
                    password: "open"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    var data = {
                        _id: "000000000000000000000002",
                        name: "Peter Parker",
                        username: "peter",
                        role: "user",
                        token: res.body.token
                    };
                    token = res.body.token;
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
    
    it('should not create a SINGLE company on /api/companies POST', function (done) {
        //calling PROJECT api
        server
                .post('/api/companies')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: "The lab",
                    time: "2000",
                    content: "Experiments that's what they like to do.",
                    roles: [
                        {name: "user"}
                    ]
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    var data = "No privileges";
                    res.status.should.equal(401);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
