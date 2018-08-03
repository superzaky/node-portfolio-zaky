// With strict mode, you can not, for example, use undeclared variables.
var User = require('../models/User');

'use strict';

module.exports = class UserService {
   constructor() {
   }

   display() {
       console.log(this.firstName + " " + this.lastName);
   }

    async findOne(username) {
        // Find one user
        return await User.findOne({ username: username }).exec();
    }


    validate(req){
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

    makeUser(req) {
        // create a new user
        this.newUser = User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            role: "guest"
        });
    }

    async save() {
        return await this.newUser.save();  
    }
   
}
