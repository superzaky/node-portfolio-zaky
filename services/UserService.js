// With strict mode, you can not, for example, use undeclared variables.
var User = require('../models/User');
var MongooseService = require('./MongooseService');

'use strict';

module.exports = class UserService extends MongooseService {
    constructor() {
        super();
    }

    async findOne(username) {
        // Find one user
        return await User.findOne({ username: username }).exec();
    }

    validate(req) {
        try {
            console.log('ye');
            //invoke validateInput() without instantiating it
            User.validateInput(req.body);
            console.log('ye2');
            return true;
        } catch (err) {
            // res.status(400).json(err);
            console.log('error ', err);
            return err;
        }
    }

    makeEntity(req) {
        // create a new user
        this.newEntity = User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            role: "guest"
        });
    }
}
