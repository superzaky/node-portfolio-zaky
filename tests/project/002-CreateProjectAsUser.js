require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user creates a project", function () {
    var id = "asd";
    it('should create a SINGLE session on /api/auth/login POST', function (done) {
        //calling LOGIN api
        server
                .post('/api/auth/login')
                .send({
                    username: "peter",
                    password: "open"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    var data = {
                        _id: "000000000000000000000002",
                        name: "Peter Parker",
                        username: "peter",
                        role: "user"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
    
    it('should create a SINGLE project on /api/projects POST', function (done) {
        //calling PROJECT api
        server
                .post('/api/projects')
                .send({
                    user: "000000000000000000000002", //id of the user
                    name: "project spiderman",
                    content: "some project about spiderman.",
                    images: [ 
                        {link: "http://myimages.com/web.png"}, 
                        {link: "http://myimages.com/superpowers.png"}, 
                    ],
                    projectType: "Web"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    var data = "No privileges";
                    res.status.should.equal(401);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });
});
