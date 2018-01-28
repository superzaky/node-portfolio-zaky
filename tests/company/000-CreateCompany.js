require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var Company = require('../../models/User');

describe("An admin creates a company", function () {
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
    
    it('should create a SINGLE comapny on /api/companies POST', function (done) {
        //calling COMPANY api
        server
                .post('/api/companies')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: "company A",
                    time: "2002",
                    content: "A great company with happy employees.",
                    roles: [
                        {name: "user"}
                    ]
                })
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    //TO DO: compare created_at and updated_at
                    var data = {
                        _id: res.body._id, //the _id is dynamic because it's just created
                        name: "company A",
                        time: "2002",
                        content: "A great company with happy employees.",
                        roles: [
                            {name: "user"}
                        ]
                    };
                    res.status.should.equal(200);
                    assert.deepEqual(res.body, data);
                    //TO DO: check if project is inserted in the database through using the ID to find the project
                    id = res.body._id;
                    done();
                });
    });
});
