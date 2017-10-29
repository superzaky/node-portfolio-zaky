require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user registers", function () {
    var id = "asd";
    it('should create a SINGLE user on /api/register POST', function (done) {
        //calling REGISTER api
        server
                .post('/api/auth/register')
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
                        _id: res.body._id, //the _id is dynamic because it's just created
                        name: "John Doe",
                        username: "john",
                        role: "guest"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if user is inserted in the database through using the ID to find the user
                    id = res.body._id;
                    done();
                });
    });
    User.find({username: "john"}, function (err, users) {
        if (err)
            return console.error(err);
        assert.equal(users.length, 1);
    });
});
