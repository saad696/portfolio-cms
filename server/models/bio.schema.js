const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bioSchema = new Schema({
    bio: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Bio', bioSchema);
