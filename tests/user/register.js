var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
// This agent refers to PORT where our program is running.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe("A user registers", function () {
    it('should create a SINGLE user on /api/register POST', function (done) {
        //calling REGISTER api
        server
                .post('/api/register')
                .send({
                    name: "John Doe",
                    username: "john",
                    password: "open",
                    confirm_password: "open"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    //TO DO: compare created_at and updated_at
                    var data = {
                        name: "John Doe",
                        username: "john",
                        admin: false
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
