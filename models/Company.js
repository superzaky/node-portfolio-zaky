// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sha1 = require('sha1');

// create a schema
var companySchema = new Schema({
    name: String,
    time: String,
    content: {type: String},
    roles: [
        {   
            _id : false, 
            name: String
        }
    ],
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
companySchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

/**
 * Validates the input of a company
 * 
 * @param {type} body
 * @returns {Boolean}
 */
companySchema.methods.validateInput = function (body) {
    if (body.name === "" || body.hasOwnProperty('name') === false) throw "A name is required.";
    
    return true;
}

// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model('Company', companySchema);

// make this available to our companies in our Node applications
module.exports = Company;
