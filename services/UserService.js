// With strict mode, you can not, for example, use undeclared variables.
var User = require('../models/User');
var MongooseService = require('./MongooseService');

'use strict';

module.exports = class UserService extends MongooseService {
    constructor(key) {
        super(User, key);
    }

    makeModel(req) {
        // create a new user
        this.model = User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            role: "guest"
        });
    }
}
