var express = require('express');
var router = express.Router();
// grab the user model
var User = require('../models/User');
var sha1 = require('sha1');

router.get('/users', function (req, res) { 
    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    } else if (req.session.user.role !== "admin"){
        res.status(401).json('No privileges');
        return;
    }

    if(isNaN(req.query.pageSize) !== true) {  
        var page = 0;
        if (req.query.page !== undefined) {
            page = req.query.page - 1;
        }
        
        var perPage = Number(req.query.pageSize);
        var result = perPage * page;
        
        User.find({})
        .limit(perPage)
        .skip(perPage * page)
        .exec(function(err, currentUsers) {
            
            if (currentUsers !== null) {
                if (err) console.log("een error " + error);

                User.count({}, function(err, count){
                    var obj = {
                        totalItems: count,
                        items: currentUsers
                    }
                    // console.log("json stringfy  obj  = "+JSON.stringify(obj, null, 4));
                    res.status(200).json(obj);
                });
            } else {
                console.log("geen users gevonden");
                res.status(400).json("No users found.");
            }
        });  
    } else {    
        // get all the users
        User.find({}, function(err, currentUsers) {
            if (currentUsers !== null) {
                if (err) console.log("een error " + err);
                
                User.count({}, function(err, count){
                    var obj = {
                        totalItems: count,
                        items: currentUsers
                    }
                    res.status(200).json(obj);
                });
                
            } else {
                console.log("geen users gevonden");
                res.status(400).json("No users found.");
            }
        });
        
    }
});

router.get('/users/:id', function (req, res) { 
    if (!req.session.user || req.session.user === undefined) {
            res.status(404).json('Session not found');
            return;
    }

    if (req.session.user.role !== "admin"){
        res.status(401).json("No privileges.");
    } else {
        // get the user
        User.findOne({ _id: req.params.id}, function(err, currentUser) {
            if (currentUser !== null) {
                if (err) console.log("een error " + err);
                
                var data = {
                    _id: currentUser._id,
                    name: currentUser.name,
                    username: currentUser.username,
                    role: currentUser.role
                };

                res.status(200).json(data);
            } else {
                console.log("user is niet gevonden");
                res.status(400).json("User doesn't exist.");
            }
        });
    }
});

router.delete('/users/:id', function (req, res) { 
    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    } else if (req.session.user.role !== "admin"){
        res.status(401).json('No privileges');
        return;
    }

    // get the user
    User.findOne({ _id: req.params.id}, function(err, currentUser) {
        if (currentUser !== null) {
            if (err) console.log("een error " + error);
        
            // delete user
            currentUser.remove(function(err) {
                if (err) throw err;
        
                res.status(200).json("User is successfully deleted.");
            });
        } else {
            console.log("user is niet gevonden");
            res.status(400).json("User doesn't exist.");
        }
    });
});

router.put('/users', function (req, res) { 

    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    } else if (req.session.user.role !== "admin"){
        res.status(401).json('No privileges');
        return;
    }
    
    User.findOne({_id: req.body._id}, function (err, currentUser) {

        if (currentUser !== null) {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            currentUser.name = req.body.name || currentUser.name;
            currentUser.username = req.body.username || currentUser.username;
            currentUser.password = req.body.password || currentUser.password;
            currentUser.confirm_password = req.body.confirm_password || currentUser.confirm_password;
            currentUser.role = req.body.role || currentUser.role;

            currentUser.save(function (err, updatedUser) {
                if (err){
                    console.log("error msg: ");
                    console.log(err);
                    console.log("end error msg");
                } 
                else {
                    var data = {
                        _id: updatedUser._id,
                        name: updatedUser.name,
                        username: updatedUser.username,
                        role: updatedUser.role
                    };
                    res.status(200).json(data);
                }
            }); 
        } else {
            res.status(400).json("User doesn't exist.");
        }
    });
});

router.post('/users', function (req, res) {
    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    } else if (req.session.user.role !== "admin"){
        res.status(401).json('No privileges');
        return;
    }
    
    var newUser = User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        role: req.body.role,
    });
    
    console.log("newUser =" + newUser);
    try {
        newUser.validateInput(req.body);
    } catch (err) {
        res.status(400).json(err);
        return;
    }
  
    newUser.save(function (err, newUser) {
        if (err){
            console.log("error msg: ");
            console.log(err);
            console.log("end error msg");
        } 
        else {
            var data = {
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                role: newUser.role
            };
            res.status(200).json(data);
        }
    });    
});

module.exports = router;
