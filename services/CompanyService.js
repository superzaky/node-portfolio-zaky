const Company = require('../models/Company');
const MongooseService = require('./MongooseService');

module.exports = class CompanyService extends MongooseService {
    constructor(keys) {
        super(Company, keys);
    }

    makeModel(req) {
        // create a new Company
        this.model = Company({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            role: "guest"
        });
    }
};
