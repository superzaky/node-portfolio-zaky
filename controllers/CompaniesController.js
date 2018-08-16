const express = require('express');

const router = express.Router();
// grab the user model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Company = require('../models/Company');
const config = require('../config/config');
const AuthService = require('../services/AuthService');
const CompanyService = require('../services/CompanyService');

router.get('/companies', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization === undefined) {
        res.status(404).json('Token not found');
        return;
    }

    const token = req.headers.authorization.split(' ')[1];
    let result = AuthService.verify(token);
    let user = '';
    result.then((valid) => {
        if (!valid) {
            // Token isn't valid
            res.status(400).json(valid);
        } else {
            user = valid.sub;
            return user;
        }
        return false;
    })
        .then((currentUser) => {
            console.log('currentUser', currentUser);
            if (currentUser.role !== 'admin') {
                // person is a user or guest.
                const companyService = new CompanyService(['roles']);
                const role = { name: currentUser.role };
                result = companyService.find([role]);
                result.then((currentCompanies, err) => {
                    console.log('companyService!!!', currentCompanies);
                    if (currentCompanies !== null) {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            return currentCompanies;

                            // Company.count({}, (error, count) => {
                            //     if (error) {
                            //         console.log('oho!!!');
                            //         res.status(400).json(error);
                            //     } else {
                            //         const obj = {
                            //             totalItems: count,
                            //             items: currentCompanies
                            //         };
                            //         res.status(200).json(obj);
                            //     }
                            // });
                        }
                    } else {
                        console.log('geen companies gevonden');
                        res.status(400).json('No companies found.');
                    }
                    return false;
                });
                // // person is a user or guest.
                // Company.find({ roles: { name: user.role } }, (err, currentCompanies) => {
                //     if (currentCompanies !== null) {
                //         if (err) res.status(400).json(err);
        
                //         Company.count({}, (error, count) => {
                //             if (error) res.status(400).json(error);
                //             const obj = {
                //                 totalItems: count,
                //                 items: currentCompanies
                //             };
                //             res.status(200).json(obj);
                //         });
                //     } else {
                //         console.log('geen companies gevonden');
                //         res.status(400).json('No companies found.');
                //     }
                // });
            } else {
                // person is admin.
                // get the companies
                Company.find({}, (err, currentCompanies) => {
                    if (currentCompanies !== null) {
                        if (err) console.log('een error ', err);
                        Company.count({}, (error, count) => {
                            if (error) res.status(400).json(error);
                            const obj = {
                                totalItems: count,
                                items: currentCompanies
                            };
                            res.status(200).json(obj);
                        });
                    } else {
                        res.status(400).json('No companies found.');
                    }
                });
            }
        })
        .then((currentCompanies) => {
            const companyService = new CompanyService(['roles']);
            result = companyService.count();

            result.then((error, count) => {
                if (error) {
                    console.log('oho!!!');
                    res.status(400).json(error);
                } else {
                    const obj = {
                        totalItems: count,
                        items: currentCompanies
                    };
                    //hier was je, todo test of dit werkt
                    res.status(200).json(obj);
                }
            });
        });

    // const token = req.headers.authorization.split(' ')[1];
    // let user = '';
    // jwt.verify(token, config.development.secret, (err, decoded) => {
    //     // console.log("!!!!json stringfy token decoded = "+JSON.stringify(decoded, null, 4));
    //     user = decoded.sub;
    //     if (err) {
    //         /*
    //             err = {
    //             name: 'TokenExpiredError',
    //             message: 'jwt expired',
    //             expiredAt: 1408621000
    //             }
    //         */
    //         // console.log("json stringfy token ERROR = "+JSON.stringify(err, null, 4));
    //         res.status(400).json('Token expired');
    //     }
    // });
});

router.post('/companies', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization === undefined) {
        res.status(404).json('Token not found');
        return;
    }

    const token = req.headers.authorization.split(' ')[1];
    let user = '';
    jwt.verify(token, config.development.secret, (err, decoded) => {
        user = decoded.sub;
        if (err) {
            console.log('json stringfy token ERROR = ', JSON.stringify(err, null, 4));
            res.status(400).json('Token expired');
        }
    });

    if (user.role !== 'admin') {
        res.status(401).json('No privileges');
        return;
    }

    const newCompany = Company({
        name: req.body.name,
        time: req.body.time,
        content: req.body.content,
        roles: req.body.roles
    });

    console.log('newCompany =', newCompany);
    try {
        newCompany.validateInput(req.body);
    } catch (err) {
        res.status(400).json(err);
        return;
    }

    newCompany.save((err, company) => {
        if (err) {
            res.status(400).json(err);
        } else {
            const data = {
                _id: company._id,
                name: company.name,
                time: company.time,
                content: company.content,
                roles: company.roles
            };
            res.status(200).json(data);
        }
    });
});

module.exports = router;
