// With strict mode, you can not, for example, use undeclared variables.
var User = require('../models/User');

'use strict';

module.exports = class MongooseService {
    /**
        @param model Mongoose model
        @param key primary key of the model that will be used for searching, removing
        and reading
    */
    constructor(model, key) {
        this.model = model;
        this.key = key;

        if (new.target === MongooseService) {
            throw new TypeError("Cannot construct MongooseService instances directly");
        }

        if (this.makeModel === undefined) {
            // or maybe test typeof this.makeModel === "function"
            throw new TypeError("Must override makeModel method");
        }
    }

    async findOne(id) {
        var filter = {};
        filter[this.key] = id;
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
