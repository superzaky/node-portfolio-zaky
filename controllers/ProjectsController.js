var express = require('express');
var router = express.Router();
// grab the user model
var User = require('../models/User');
var Project = require('../models/Project');
var sha1 = require('sha1');

router.get('/projects', function (req, res) { 
    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    }

    if(isNaN(req.query.pageSize) !== true) {  
        var page = 0;
        if (req.query.page !== undefined) {
            page = req.query.page - 1;
        }
        
        var perPage = Number(req.query.pageSize);
        var result = perPage * page;
        
        Project.find({})
        .limit(perPage)
        .skip(perPage * page)
        .exec(function(err, currentProjects) {
            
            if (currentProjects !== null) {
                if (err) console.log("een error " + error);

                Project.count({}, function(err, count){
                    var obj = {
                        totalItems: count,
                        items: currentProjects
                    }
                    // console.log("json stringfy  obj  = "+JSON.stringify(obj, null, 4));
                    res.status(200).json(obj);
                });
            } else {
                console.log("geen projecten gevonden");
                res.status(400).json("No projects found.");
            }
        });  
    } else {
        if (req.session.user.role !== "admin"){
            //person is a user or guest.
            Project.find({ roles : { name : req.session.user.role} }, function(err, currentProjects) {
                if (currentProjects !== null) {
                    if (err) console.log("een error " + err);
                    
                    Project.count({}, function(err, count){
                        var obj = {
                            totalItems: count,
                            items: currentProjects
                        }
                        res.status(200).json(obj);
                    });
                    
                } else {
                    console.log("geen projecten gevonden");
                    res.status(400).json("No projects found.");
                }
            });
        } else {
            //person is admin.
            // get the projects
            Project.find({}, function(err, currentProjects) {
                if (currentProjects !== null) {
                    if (err) console.log("een error " + err);
                    
                    Project.count({}, function(err, count){
                        var obj = {
                            totalItems: count,
                            items: currentProjects
                        }
                        res.status(200).json(obj);
                    });
                    
                } else {
                    console.log("geen projecten gevonden");
                    res.status(400).json("No projects found.");
                }
            });
        }
    }
});

router.get('/projects/:id', function (req, res) { 
    if (!req.session.user || req.session.user === undefined) {
            res.status(404).json('Session not found');
            return;
    }

    if (req.session.user.role !== "admin"){
        // get the project
        Project.findOne({ _id: req.params.id,  roles : { name : req.session.user.role} }, function(err, currentProject) {
            if (currentProject !== null) {
                if (err) console.log("een error " + err);
    
                res.status(200).json(currentProject);
            } else {
                console.log("project is niet gevonden");
                res.status(400).json("Project doesn't exist. Or no privileges.");
            }
        });
    } else {
        // get the project
        Project.findOne({ _id: req.params.id}, function(err, currentProject) {
            if (currentProject !== null) {
                if (err) console.log("een error " + err);
    
                res.status(200).json(currentProject);
            } else {
                console.log("project is niet gevonden");
                res.status(400).json("Project doesn't exist.");
            }
        });
    }
});

router.delete('/projects/:id', function (req, res) { 
    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    } else if (req.session.user.role !== "admin"){
        res.status(401).json('No privileges');
        return;
    }

    // get the project
    Project.findOne({ _id: req.params.id}, function(err, currentProject) {
        if (currentProject !== null) {
            if (err) console.log("een error " + error);
        
            // delete project
            currentProject.remove(function(err) {
                if (err) throw err;
        
                res.status(200).json("Project is successfully deleted.");
            });
        } else {
            console.log("project is niet gevonden");
            res.status(400).json("Project doesn't exist.");
        }
    });
});

router.put('/projects', function (req, res) { 

    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    } else if (req.session.user.role !== "admin"){
        res.status(401).json('No privileges');
        return;
    }
    
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
    if (!req.session.user || req.session.user === undefined) {
        res.status(404).json('Session not found');
        return;
    } else if (req.session.user.role !== "admin"){
        res.status(401).json('No privileges');
        return;
    }
    
    var newProject = Project({
        user: req.body.user,
        name: req.body.name,
        content: req.body.content,
        images: req.body.images,
        projectType: req.body.projectType,
        views: 0
    });
    
    console.log("newProject =" + newProject);
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

module.exports = router;
