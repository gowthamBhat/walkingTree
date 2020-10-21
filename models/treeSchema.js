const mongoose = require('mongoose');


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

const Tree = mongoose.model('tree', treeSchema);

module.exports = Tree;