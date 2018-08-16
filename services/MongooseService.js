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
            throw new TypeError('Cannot construct MongooseService instances directly');
        }

        if (this.makeModel === undefined) {
            // or maybe test typeof this.makeModel === "function"
            throw new TypeError('Must override makeModel method');
        }
    }

    async findOne(id) {
        const filter = {};
        let i;
        for (i = 0; i < this.keys.length; i += 1) {
            filter[this.keys[i]] = id[i];
        }
        // filter[this.keys] = id;
        // Find one model
        return await this.model.findOne(filter).exec();
    }

    // Company.find({ roles: { name: user.role } }, (err, currentCompanies) => {
    //     if (currentCompanies !== null) {
    //         if (err) res.status(400).json(err);

    //         Company.count({}, (error, count) => {
    //             if (error) res.status(400).json(error);
    //             const obj = {
    //                 totalItems: count,
    //                 items: currentCompanies
    //             };
    //             res.status(200).json(obj);
    //         });
    //     } else {
    //         console.log('geen companies gevonden');
    //         res.status(400).json('No companies found.');
    //     }
    // });

    async count() {
        return await this.model.count().exec();
    }

             // Company.count({}, (error, count) => {
                            //     if (error) {
                            //         console.log('oho!!!');
                            //         res.status(400).json(error);
                            //     } else {
                            //         const obj = {
                            //             totalItems: count,
                            //             items: currentCompanies
                            //         };
                            //         res.status(200).json(obj);
                            //     }
                            // });

    async find(id) {
        let filter = {};
        let i;
        for (i = 0; i < this.keys.length; i += 1) {
            filter[this.keys[i]] = id[i];
        }
        // Find model(s)
        return this.model.find(filter).exec();
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
