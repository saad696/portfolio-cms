const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillsSchema = new Schema({
    skillName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Skills', skillsSchema);
