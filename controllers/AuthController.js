let express = require('express');
let router = express.Router();
// grab the user model
let User = require('../models/User');
let sha1 = require('sha1');
let config = require('../config/config');
let jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
let UserService = require('../services/UserService');
let AuthService = require('../services/AuthService');

router.get('/', function (req, res) {
    if (!req.headers.authorization || req.headers.authorization === undefined) {
        res.status(404).json('Token not found');
        return;
    }
    // console.log("json stringfy get req.headers.authorization.split(' ')[1] = "+JSON.stringify(req.headers.authorization.split(' ')[1], null, 4));
    let token = req.headers.authorization.split(' ')[1];
    let authService = new AuthService();
    let result = authService.verify(token);
    result.then (function (valid) {
        console.log('valid ', valid);
        if (valid) {
            res.status(200).json(valid);
            return;
        } else {
            //Token isn't valid
            res.status(400).json(valid);
            return;
        }
    });
});

router.post('/register', function (req, res) {            
    let userService = new UserService(['username']);
    let result = userService.findOne([req.body.username]);
    result.then (function (user) {
        if (user !== null) {
            res.status(400).json("You already have registered");
            return;
        }
    });
    result = userService.validate(req);
    if (result !== true) {
        res.status(400).json(result);
        return;
    }
    userService.makeModel(req);
    result = userService.save();

    result.then (function (user) {
        res.status(200).json(user);
    });
});

router.post('/login', function (req, res) {
    if(req.body.logout === true) {
        req.session.destroy();
        res.status(200).json("Successfully logged out");
    } else {
        let userService = new UserService(['username', 'password']);
        let result = userService.findOne([req.body.username, sha1(req.body.password)]);
        result.then (function (user) {
            if (user !== null) {
                let authService = new AuthService(user);
                let token = authService.signToken ( authService.getSub() );
                let data = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role,
                    token: token
                };
                req.session.user = data;
                res.status(200).json(data);
                return;
            } else {
                res.status(400).json("Invalid username or password");
            }
        });
    }
});

router.get('/logout', function (req, res) {
    //Om de één of andere reden kan ik niet bij sessie bij in /logout. In /login kan ik er wel bij.
    req.session.destroy();
    res.status(200).json("Successfully logged out");
});
module.exports = router;
