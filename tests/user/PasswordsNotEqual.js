var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
// This agent refers to PORT where our program is running.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe("A user registers with different passwords", function () {
    it("shouldn't create a SINGLE user on /api/register POST", function (done) {
        //calling REGISTER api
        server
                .post('/api/register')
                .send({
                    name: "John Doe",
                    username: "john",
                    password: "open",
                    confirm_password: "openq"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    //TO DO: compare created_at and updated_at
                    var data = {
                        message: "Passwords must be equal"
                    };
                    res.status.should.equal(400);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
