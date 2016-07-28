'use strict';

var config = require('../config/config');
var mongoose = require('mongoose');
var data = require('./data/data');
// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

beforeEach(function (done) {
    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {});
        }
    }

    function fillDB() {
        data.insertFixtures();
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.getDbPath(process.env.NODE_ENV), function (err) {
            if (err) {
                throw err;
            }
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                // yay connected!
                clearDB();
                fillDB();
                done();
            });
        });
    } else {
        clearDB();
        fillDB();
        done();
    }

});

afterEach(function (done) {
    mongoose.disconnect();
    return done();
});
