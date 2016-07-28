require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);

// UNIT test begin
describe("A user registers with different passwords", function () {
    it("shouldn't create a SINGLE user on /api/register POST", function (done) {
        //calling REGISTER api
        server
                .post('/api/auth/register')
                .send({
                    name: "John Doe",
                    username: "john",
                    password: "open",
                    confirm_password: "openq"
                })
                .expect("Content-type", /json/)
                .expect(400)
                .end(function (err, res) {
                    var data = "Both passwords aren't equal.";
                    res.status.should.equal(400);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
