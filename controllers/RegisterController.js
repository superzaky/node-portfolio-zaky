var express = require('express');
var router = express.Router();
// grab the user model
var User = require('../models/User');

router.post('/', function (req, res) {
    // create a new user
    var newUser = User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        admin: false
    });

    try {
        newUser.validateInput(req.body);
    } catch (err) {
        res.status(400).json(err);
    }

    newUser.save(function (err, newUser) {
        if (err)
            return console.error(err);
    });

    var data = {
        name: req.body.name,
        username: req.body.username,
        admin: false
    };

    res.status(200).json(data);
});

module.exports = router;
