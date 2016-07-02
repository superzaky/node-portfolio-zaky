var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var projects = require('./routes/projects');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/config');
var dbPath = "";

switch (app.settings.env)
{
    case 'development':
        dbPath = config.development.path;
        break;

    case 'test':
        dbPath = config.test.path;
        break;

    case 'staging':
        break;

    case 'production':
        break;
}

mongoose.connect(dbPath);
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

var server = app.listen(3000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
module.exports = app;
