// With strict mode, you can not, for example, use undeclared variables.
var User = require('../models/User');

'use strict';

module.exports = class MongooseService {
    /**
        @param model Mongoose model
        @param keys (primary) key(s) of the model that will be used for searching, removing
        and reading
    */
    constructor(model, keys) {
        this.model = model;
        this.keys = keys;

        if (new.target === MongooseService) {
            throw new TypeError("Cannot construct MongooseService instances directly");
        }

        if (this.makeModel === undefined) {
            // or maybe test typeof this.makeModel === "function"
            throw new TypeError("Must override makeModel method");
        }
    }

    async findOne(id) {
        let filter = {};
        let i;
        for (i = 0; i < this.keys.length; i += 1) {
            filter[this.keys[i]] = id[i];
        }
        // filter[this.keys] = id;
        // Find one model
        return await this.model.findOne(filter).exec();
    }

    validate(req) {
        try {
            //invoke validateInput() without instantiating it
            this.model.validateInput(req.body);
            return true;
        } catch (err) {
            // res.status(400).json(err);
            console.log('error ', err);
            return err;
        }
    }

    async save() {
        return await this.model.save();
    }
}
