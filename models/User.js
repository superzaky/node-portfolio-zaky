// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sha1 = require('sha1');

// create a schema
var userSchema = new Schema({
    name: String,
    username: {type: String, unique: true},
    password: {type: String},
    role: String,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function (next) {
    //we hash the password
    this.password = sha1(this.password);

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
 * Validates the input of the user
 * 
 * @param {type} body
 * @returns {Boolean}
 */
userSchema.methods.validateInput = function (body) {
    if (body.username === "" || body.hasOwnProperty('username') === false) throw "A username is required.";
    
    if (body.name === "" || body.hasOwnProperty('name') === false) throw "A name is required.";
    
    if (body.password === "" || body.hasOwnProperty('password') === false) throw "A password is required.";
    
    if (body.password !== body.confirm_password) throw "Both passwords aren't equal.";

    return true;
}

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
