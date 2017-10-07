var express = require('express');
var router = express.Router();
// grab the user model
var User = require('../models/User');
var Project = require('../models/Project');
var sha1 = require('sha1');

router.get('/', function (req, res) {
    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    }

    res.status(200).json(req.session.user);
});

router.put('/projects', function (req, res) { 
    Project.findOne({_id: req.body._id}, function (err, currentProject) {

        if (currentProject !== null) {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            currentProject.user = req.body.user || currentProject.user;
            currentProject.name = req.body.name || currentProject.name;
            currentProject.content = req.body.content || currentProject.content;
            currentProject.images = req.body.images || currentProject.images;
            currentProject.projectType = req.body.projectType || currentProject.projectType;

            currentProject.save(function (err, updatedProject) {
                if (err){
                    console.log("error msg: ");
                    console.log(err);
                    console.log("end error msg");
                } 
                else {
                    var data = {
                        _id: updatedProject._id,
                        user: updatedProject.user,
                        name: updatedProject.name,
                        content: updatedProject.content,
                        views: updatedProject.views,
                        images: updatedProject.images,
                        projectType: updatedProject.projectType
                    };
                    res.status(200).json(data);
                }
            }); 
        } else {
            res.status(400).json("Project doesn't exist.");
        }
    });
});

router.post('/projects', function (req, res) {
    var newProject = Project({
        user: req.body.user,
        name: req.body.name,
        content: req.body.content,
        images: req.body.images,
        projectType: req.body.projectType,
        views: 0
    });

    try {
        newProject.validateInput(req.body);
    } catch (err) {
        res.status(400).json(err);
        return;
    }
  
    newProject.save(function (err, newProject) {
        if (err){
            console.log("error msg: ");
            console.log(err);
            console.log("end error msg");
        } 
        else {
            var data = {
                _id: newProject._id,
                user: newProject.user,
                name: newProject.name,
                content: newProject.content,
                views: 0,
                images: newProject.images,
                projectType: newProject.projectType
            };
            res.status(200).json(data);
        }
    });    
});

router.post('/login', function (req, res) {
    User.findOne({username: req.body.username, password: sha1(req.body.password)}, function (err, user) {
        
        if (user !== null) {
            var data = {
                _id: user._id,
                name: user.name,
                username: user.username,
                admin: user.admin
            };
            
            req.session.user = data;
            res.status(200).json(data);
            return;
        } else {
            res.status(400).json("Invalid username or password");
        }
    });
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.status(200).json("Successfully logged out");
});
module.exports = router;
