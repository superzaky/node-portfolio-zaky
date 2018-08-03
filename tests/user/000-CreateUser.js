require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("An admin creates a user", function () {
    var id = "asd";

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

    it('should create a SINGLE user on /api/users POST', function (done) {
        //calling USER api
        server
                .post('/api/users')
                .send({
                    name: "Kees Bergkamp",
                    username: "kees",
                    password: "open",
                    confirm_password: "open",
                    role: "guest"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .expect(function (res) {
                    //TO DO: compare created_at and updated_at
                    var data = {
                        _id: res.body._id, //the _id is dynamic because it's just created
                        name: "Kees Bergkamp",
                        username: "kees",
                        role: "guest"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if user is inserted in the database through using the ID to find the user
                    id = res.body._id;
                })
                .expect(function (res) {
                    User.find({username: "kees"}, function (err, users) {
                        if (err)
                            return console.error(err);
                        assert.equal(users.length, 1);
                        assert.equal(users[0].username, 'kees');
                    });
                })
                .end(function (err, res) {
                    done();
                });
    });

});
