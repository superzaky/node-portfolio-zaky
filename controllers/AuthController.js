var express = require('express');
var router = express.Router();
// grab the user model
var User = require('../models/User');
var sha1 = require('sha1');

router.get('/', function (req, res) {
    if (!req.session.user) return res.status(404).json('Session not found');

    res.status(200).json(req.session.user);
});

router.post('/register', function (req, res) {
    // create a new user
    var newUser = User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        admin: false
    });
    
    var errorMsg = "";
    try {
        newUser.validateInput(req.body);
    } catch (err) {
        errorMsg = err;
        res.status(400).json(err);
    }
    
    if (errorMsg === "" ) {
        newUser.save(function (err, newUser) {
            if (err)
                return console.error(err);

            var data = {
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                admin: newUser.admin
            };

            res.status(200).json(data);
        });
        
    }
        

});

router.post('/login', function (req, res) {
    User.findOne({username: req.body.username, password: sha1(req.body.password)}, function (err, user) {
        var data = {
            _id: user._id,
            name: user.name,
            username: user.username,
            admin: user.admin
        };
        
        req.session.user = data;
        res.status(200).json(data);
    });
});
module.exports = router;
