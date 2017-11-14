require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("An admin updates a project", function () {
    var id = "asd";
    var token = "";
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
                    token = res.body.token;
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    done();
                });
    });

    it('should update a SINGLE project on /api/projects PUT', function (done) {
        //calling PROJECT api
        server
                .put('/api/projects')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    _id: "000000000000000000000001", //id of the project
                    user: "000000000000000000000001", //id of the user
                    name: "project fruit2",
                    content: "some project about fruit2.",
                    images: [ 
                        {link: "http://myimages.com/myimage10.png"}
                    ],
                    projectType: "Desktop"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    //TO DO: compare created_at and updated_at
                    var data = {
                        _id: "000000000000000000000001",
                        user: "000000000000000000000001",
                        name: "project fruit2",
                        content: "some project about fruit2.",
                        views: 0,
                        images: [ 
                            {link: "http://myimages.com/myimage10.png"}
                        ],
                        projectType: "Desktop"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if project is updated in the database through using the ID to find the project
                    id = res.body._id;
                    done();
                });
    });
});
