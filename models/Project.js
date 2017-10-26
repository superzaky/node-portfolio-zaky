// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var projectSchema = new Schema({
    user: String,
    name: String,
    content: {type: String},
    views: 0,
    images: [
        {   
            _id : false, 
            link: String
        }
    ],
    roles: [
        {   
            _id : false, 
            name: String
        }
    ],
    projectType: String,
    created_at: Date,
    updated_at: Date
});

projectSchema.methods.validateInput = function (body) {
    // if (body.user === "" || body.hasOwnProperty('user') === false) throw "Please login to create a project.";
    
    if (body.name === "" || body.hasOwnProperty('name') === false) throw "A name is required.";

    return true;
}

// the schema is useless so far
// we need to create a model using it
var Project = mongoose.model('Project', projectSchema);

// make this available to our users in our Node applications
module.exports = Project;
