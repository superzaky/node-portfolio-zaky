var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var projects = require('./routes/projects');
var app = express();
var mongoose = require('mongoose');
var config = require('./config/config');
var session = require('express-session');

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

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// we are mapping the routes to end points.
app.use('/', index);
app.use('/api/auth', require('./controllers/AuthController'));
app.use('/api/v1/', projects);

//We use this to avoid the error: Cannot GET /login
app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname, 'public/index.html')); 
});

// TODO: catch 404 and forward to error handler

var port = 3000;

if(process.env.NODE_ENV === "test") port = 3002;

var server = app.listen(port, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
module.exports = app;
