var express = require('express');
var router = express.Router();
// grab the user model
var User = require('../models/User');
var sha1 = require('sha1');

router.get('/', function (req, res) {
    console.log("get session ctrl");
    console.log("json stringfy get session user  = "+JSON.stringify(req.session.user, null, 4));
    if (!req.session.user || req.session.user === undefined) {
        console.log("geen sessie ..");
        
        res.status(404).json('Session not found');
        return;
    }
    
    console.log("get session gevonden");
    res.status(200).json(req.session.user);
});

router.post('/register', function (req, res) {            
    User.findOne({username: req.body.username}, function (err, user) {
        if (user !== null) {
            res.status(400).json("You already have registered"); 
            return;
        }
    });

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
        return;
    }
  
    newUser.save(function (err, newUser) {
        if (err){} 
        else {
            var data = {
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                admin: newUser.admin
            };
            res.status(200).json(data);
        }
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
                var data = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    admin: user.admin
                };
                
                console.log("user gevonden");
                req.session.user = data;
                console.log("json stringfy  login user  = "+JSON.stringify(req.session.user, null, 4));
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
