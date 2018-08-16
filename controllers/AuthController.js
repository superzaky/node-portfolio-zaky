const express = require('express');

const router = express.Router();
// grab the user model
const sha1 = require('sha1');
const UserService = require('../services/UserService');
const AuthService = require('../services/AuthService');

// Dit heet een arrow callback function: (req, res) =>
router.get('/', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization === undefined) {
        res.status(404).json('Token not found');
        return;
    }
    // console.log('json stringfy get req.headers.authorization.split()',
    //     JSON.stringify(req.headers.authorization.split(' ')[1], null, 4));
    const token = req.headers.authorization.split(' ')[1];
    const result = AuthService.verify(token);
    result.then((valid) => {
        if (valid) {
            res.status(200).json(valid);
        } else {
            // Token isn't valid
            res.status(400).json(valid);
        }
    });
});

router.post('/register', (req, res) => {
    const userService = new UserService(['username']);
    let result = userService.findOne([req.body.username]);
    result.then((user) => {
        if (user !== null) {
            res.status(400).json('You already have registered');
            // return;
        }
    });
    result = userService.validate(req);
    if (result !== true) {
        res.status(400).json(result);
        return;
    }
    userService.makeModel(req);
    result = userService.save();

    result.then((user) => {
        res.status(200).json(user);
    });
});

router.post('/login', (req, res) => {
    if (req.body.logout === true) {
        req.session.destroy();
        res.status(200).json('Successfully logged out');
    } else {
        const userService = new UserService(['username', 'password']);
        const result = userService.findOne([req.body.username, sha1(req.body.password)]);
        result.then((user) => {
            if (user !== null) {
                const authService = new AuthService(user);
                const token = AuthService.signToken(authService.getSub());
                const data = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role,
                    token: token
                };
                req.session.user = data;
                res.status(200).json(data);
            } else {
                res.status(400).json('Invalid username or password');
            }
        });
    }
});

router.get('/logout', (req, res) => {
    // Om de één of andere reden kan ik niet bij sessie bij in /logout. In /login kan ik er wel bij.
    req.session.destroy();
    res.status(200).json('Successfully logged out');
});
module.exports = router;
