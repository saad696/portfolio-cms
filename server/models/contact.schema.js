const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    github_url: {
        type: String,
    },
    linkedin_url: {
        type: String,
    },
});

module.exports = mongoose.model('Contact', contactSchema);
