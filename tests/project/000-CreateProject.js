require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("An admin creates a project", function () {
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
    
    it('should create a SINGLE project on /api/projects POST', function (done) {
        //calling PROJECT api
        server
                .post('/api/projects')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    user: "000000000000000000000001", //id of the user
                    name: "project cake",
                    content: "some project about cakes.",
                    images: [ 
                        {link: "http://myimages.com/myimage01.png"}, 
                        {link: "http://myimages.com/myimage02.png"}, 
                    ],
                    roles: [
                        {name: "user"}
                    ],
                    projectType: "Web"
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    //TO DO: compare created_at and updated_at
                    var data = {
                        _id: res.body._id, //the _id is dynamic because it's just created
                        user: "000000000000000000000001",
                        name: "project cake",
                        content: "some project about cakes.",
                        views: 0,
                        images: [ 
                            {link: "http://myimages.com/myimage01.png"}, 
                            {link: "http://myimages.com/myimage02.png"}, 
                        ],
                        roles: [
                            {name: "user"}
                        ],
                        projectType: "Web"
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if project is inserted in the database through using the ID to find the project
                    id = res.body._id;
                    done();
                });
    });
});
