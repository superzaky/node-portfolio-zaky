// With strict mode, you can not, for example, use undeclared variables.
'use strict';
let jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
let config = require('../config/config');

module.exports = class AuthService {
    /**
        @param user User that needs to assigned to a token
    */
    constructor(user) {
         // sub staat voor subject waarschijnlijk
        this.sub = {
            _id: user._id,
            name: user.name,
            username: user.username,
            role: user.role
        };
    }

    getSub() {
        return this.sub;
    }

    signToken(sub) {
        // console.log("json stringfy  secret  = "+JSON.stringify(config.development.secret, null, 4));
        let token = jwt.sign( {sub: sub}, config.development.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        return token;
    }
}
