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

    it('should NOT create a SINGLE user on /api/users POST', function (done) {
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
                .end(function (err, res) {
                    //TO DO: compare created_at and updated_at
                    var data = "Session not found";
                    res.status.should.equal(404);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if user is inserted in the database through using the ID to find the user
                    id = res.body._id;
                    done();
                });
    });
});
