const mongoose = require('mongoose');
const Joi = require('joi');


const treeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    ScientificName: {
        type: String,
        minlength: 3,
        maxlength: 25
    },
    medicalUse: {
        type: String,
        minlength: 3,
        maxlength: 250
    },
    commonName: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true
    },
    availabilityRegion: {
        type: String,
        minlength: 3,
        maxlength: 10
    }
});
function validate(param) {
    const Schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        commonName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
    });
    return Schema.validate({ name: param.name, commonName: param.commonName });
}
const Tree = mongoose.model('tree', treeSchema);

module.exports.Tree = Tree;
module.exports.validate = validate;