require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user gets a project by ID", function () {
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

    it('should get a SINGLE project on /api/projects/000000000000000000000003 GET', function (done) {
        //calling PROJECT api
        server
                .get('/api/projects/000000000000000000000003')
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    var data = {
                        _id: "000000000000000000000003", //the _id is dynamic because it's just created
                        user: "000000000000000000000001",
                        name: "project table",
                        content: "some project about a table.",
                        views: 0,
                        images: [ 
                            {link: "http://myimages.com/myimage06.png"}
                        ],
                        projectType: "Desktop",
                        __v: 0,
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
