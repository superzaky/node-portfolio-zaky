require('../utils');

var supertest = require("supertest");
var should = require("should");
var assert = require('chai').assert;
var app = require('../../app');
// This agent refers to PORT where our program is running.
var server = supertest.agent(app);
// UNIT test begin
var User = require('../../models/User');

describe("A user gets projects", function () {
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
            
    it('should get a all companies on /api/companies/ GET', function (done) {
        //calling PROJECT api
        server
        .get('/api/companies')
        .set('Authorization', 'Bearer ' + token)
        .expect("Content-type", /json/)
        .expect(200)
        .end(function (err, res) {
            var data = {
                totalItems: 2,
                items: [
                    {
                        _id: "000000000000000000000001",
                        created_at: res.body.items[0].created_at, //it's generated at the moment we run the test.
                        updated_at: res.body.items[0].updated_at,
                        name: "MediaMarket",
                        time: "2005",
                        content: "Selling tech for low prices.",
                        roles: [
                            {name: "user"}
                        ],
                        __v: 0
                    },
                    {
                        _id: "000000000000000000000002",
                        created_at: res.body.items[1].created_at,
                        updated_at: res.body.items[1].updated_at,
                        name: "Bike store",
                        time: "1999",
                        content: "Selling bikes.",
                        roles: [
                            {name: "guest"}
                        ],
                        __v: 0
                    }
                ]
            };
            res.status.should.equal(200);
            assert.deepEqual(res.body, data);

            done();
        });
    });
});
