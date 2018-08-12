var express = require('express');
var router = express.Router();
// grab the user model
var User = require('../models/User');
var sha1 = require('sha1');
var config = require('../config/config');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var UserService = require('../services/UserService');

router.get('/', function (req, res) {
    if (!req.headers.authorization || req.headers.authorization === undefined) {
        res.status(404).json('Token not found');
        return;
    }

    console.log("json stringfy get req.headers.authorization.split(' ')[1] = "+JSON.stringify(req.headers.authorization.split(' ')[1], null, 4));
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.development.secret, function(err, decoded) {
        // console.log("json stringfy token decoded = "+JSON.stringify(decoded, null, 4));
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          console.log("json stringfy token ERROR = "+JSON.stringify(err, null, 4));
          res.status(400).json('Token expired');
        }
    });

    if (!req.session.user || req.session.user === undefined) {
        console.log("geen sessie ..");
        
        res.status(404).json('Session not found');
        return;
    }
    
    console.log("get session gevonden");
    res.status(200).json(req.session.user);
});

router.post('/register', function (req, res) {            
    var userService = new UserService('username');
    let result = userService.findOne(req.body.username);
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
    console.log("login ctrl");

    if(req.body.logout === true) {
        req.session.destroy();
        res.status(200).json("Successfully logged out");
    } else {
        User.findOne({username: req.body.username, password: sha1(req.body.password)}, function (err, user) {
            console.log("user check");
            if (user !== null) {
                
                console.log("json stringfy  secret  = "+JSON.stringify(config.development.secret, null, 4));
                //sub staat voor subject waarschijnlijk
                var sub = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role
                };
                var token = jwt.sign( {sub: sub}, config.development.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                // console.log("json stringfy  token  = "+JSON.stringify(token, null, 4));

                var data = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role,
                    token: token
                };
                
                req.session.user = data;
                // console.log("json stringfy  login user  = "+JSON.stringify(req.session.user, null, 4));
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
