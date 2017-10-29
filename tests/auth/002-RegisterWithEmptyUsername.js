require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);

// UNIT test begin
describe("A user registers with a empty username", function () {
    it("shouldn't create a SINGLE user on /api/register POST", function (done) {
        //calling REGISTER api
        server
                .post('/api/auth/register')
                .send({
                    name: "John Doe",
                    username: "",
                    password: "open",
                    confirm_password: "open"
                })
                .expect("Content-type", /json/)
                .expect(400)
                .end(function (err, res) {
                    var data = "A username is required.";
                    res.status.should.equal(400);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
