// With strict mode, you can not, for example, use undeclared variables.
var User = require('../models/User');

'use strict';

module.exports = class MongooseService {
    constructor() {

        if (new.target === MongooseService) {
            throw new TypeError("Cannot construct MongooseService instances directly");
        }

        if (this.makeEntity === undefined) {
            // or maybe test typeof this.makeEntity === "function"
            throw new TypeError("Must override makeEntity method");
        }
    }

    async save() {
        return await this.newEntity.save();
    }
}
