// With strict mode, you can not, for example, use undeclared variables.
'use strict';
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config/config');

module.exports = class AuthService {
    /**
        @param user User that needs to assigned to a token
    */
    constructor(user) {
        // new AuthService()
        if (arguments.length) {
            // new AuthService(user)
            // sub staat voor subject waarschijnlijk
            this.sub = {
                _id: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            };
        }
    }

    getSub() {
        return this.sub;
    }

    static signToken(sub) {
        // console.log("json stringfy  secret  = "
        // +JSON.stringify(config.development.secret, null, 4));
        const token = jwt.sign({sub: sub}, config.development.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        return token;
    }

    static async verify(token) {
        try {
            const decoded = jwt.verify(token, config.development.secret);
            // De value van de variabel decoded:
            // verified  {
            //     sub:
            //     {
            //         _id: '5a123456789',
            //         name: 'John',
            //         username: 'John',
            //         role: 'guest'
            //     },
            //     iat: 1534367466,
            //     exp: 1534453866
            // }

            // console.log("json stringfy token decoded = "+JSON.stringify(decoded, null, 4));
            return await decoded;
        } catch (err) {
            /*  De value van de variabel err:
                err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
                }
            */
            // console.log("json stringfy token ERROR = " + JSON.stringify(err, null, 4));
            return err;
        }
    }
};
