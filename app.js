var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var projects = require('./routes/projects');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/config');

if (app.settings.env === "test") {
    mongoose.connect(config.getDbPath(app.settings.env), function () {
        /* Drop the DB */
        mongoose.connection.db.dropDatabase();
    });
}

if (app.settings.env === "development") {
    mongoose.connect(config.getDbPath(app.settings.env));
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// we are mapping the routes to end points.
app.use('/', index);
app.use('/api/register', require('./controllers/RegisterController'));
app.use('/api/v1/', projects);

// TODO: catch 404 and forward to error handler

var port = 3000;

if(process.env.NODE_ENV === "test") port = 3002;

var server = app.listen(port, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
module.exports = app;
