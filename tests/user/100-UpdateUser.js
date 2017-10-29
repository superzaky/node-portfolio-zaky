require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user updates a project", function () {
    var id = "asd";

    it('should create a SINGLE session on /api/auth/login UPDATE', function (done) {
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

    it('should update a SINGLE user on /api/users PUT', function (done) {
        //calling PROJECT api
        server
                .put('/api/users')
                .send({
                    _id: "000000000000000000000004", //id the user
                    name: "Dennis de Jong",
                    username: "dennis",
                    password: "open",
                    confirm_password: "open",
                    role: "user"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    //TO DO: compare created_at and updated_at
                    var data = {
                        _id: "000000000000000000000004",
                        name: "Dennis de Jong",
                        username: "dennis",
                        role: "user"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if project is updated in the database through using the ID to find the project
                    id = res.body._id;
                    done();
                });
    });
});
