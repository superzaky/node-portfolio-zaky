require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("An admin deletes a user", function () {
    var id = "asd";

    it('should create a SINGLE session on /api/auth/login UPDATE', function (done) {
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
                        role: "user"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });

    it('should delete a SINGLE user on /api/users DELETE', function (done) {
        //calling PROJECT api
        server
                .delete('/api/users/000000000000000000000005')
                .expect("Content-type", /json/)
                .expect(401)
                .end(function (err, res) {
                    var data = "No privileges";
                    res.status.should.equal(401);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if user is deleted in the database through using the ID to find the project
                    id = res.body._id;
                    done();
                });
    });
});
