var express = require('express');
var router = express.Router();
// grab the user model
var User = require('../models/User');
var Company = require('../models/Company');
var sha1 = require('sha1');
var config = require('../config/config');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


router.get('/companies', function (req, res) { 
    if (!req.headers.authorization || req.headers.authorization === undefined) {
        res.status(404).json('Token not found');
        return;
    }

    var token = req.headers.authorization.split(' ')[1];
    var user = "";
    jwt.verify(token, config.development.secret, function(err, decoded) {
        // console.log("!!!!json stringfy token decoded = "+JSON.stringify(decoded, null, 4));
        user = decoded.sub;
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

    if (user.role !== "admin"){
        //person is a user or guest.
        Company.find({ roles : { name : user.role} }, function(err, currentCompanies) {
            if (currentCompanies !== null) {
                if (err) console.log("een error " + err);
                
                Company.count({}, function(err, count){
                    var obj = {
                        totalItems: count,
                        items: currentCompanies
                    }
                    res.status(200).json(obj);
                });
                
            } else {
                console.log("geen companies gevonden");
                res.status(400).json("No companies found.");
            }
        });
    } else {
        //person is admin.
        // get the companies
        Company.find({}, function(err, currentCompanies) {
            if (currentCompanies !== null) {
                if (err) console.log("een error " + err);
                
                Company.count({}, function(err, count){
                    var obj = {
                        totalItems: count,
                        items: currentCompanies
                    }
                    res.status(200).json(obj);
                });
                
            } else {
                console.log("geen companies gevonden");
                res.status(400).json("No companies found.");
            }
        });
    }
});

router.post('/companies', function (req, res) {
    if (!req.headers.authorization || req.headers.authorization === undefined) {
        res.status(404).json('Token not found');
        return;
    }
    
    var token = req.headers.authorization.split(' ')[1];
    var user = "";
    jwt.verify(token, config.development.secret, function(err, decoded) {
        user = decoded.sub;
        if (err) {
            console.log("json stringfy token ERROR = "+JSON.stringify(err, null, 4));
            res.status(400).json('Token expired');
        }
    });
    
    if (user.role !== "admin"){
        res.status(401).json('No privileges');
        return;
    }

    var newCompany = Company({
        name: req.body.name,
        time: req.body.time,
        content: req.body.content,
        roles: req.body.roles
    });
    
    console.log("newCompany =" + newCompany);
    try {
        newCompany.validateInput(req.body);
    } catch (err) {
        res.status(400).json(err);
        return;
    }
  
    newCompany.save(function (err, newCompany) {
        if (err){
            console.log("error msg: ");
            console.log(err);
            console.log("end error msg");
        } 
        else {
            var data = {
                _id: newCompany._id,
                name: newCompany.name,
                time: newCompany.time,
                content: newCompany.content,
                roles: newCompany.roles
            };
            res.status(200).json(data);
        }
    });    
});

module.exports = router;
