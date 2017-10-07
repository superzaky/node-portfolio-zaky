require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user deletes a project", function () {
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
                        admin: false
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });

    it('should delete a SINGLE project on /api/projects DELETE', function (done) {
        //calling PROJECT api
        server
                .delete('/api/projects/000000000000000000000002')
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log("res " + res.body._id);
                    
                    var data = "Project is successfully deleted.";
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if project is deleted in the database through using the ID to find the project
                    id = res.body._id;
                    done();
                });
    });
});
