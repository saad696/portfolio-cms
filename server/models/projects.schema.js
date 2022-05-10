const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectsSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    technologies_used: {
        type: [{ type: Schema.Types.ObjectId, required: true, ref: 'Skill' }],
        required: true,
        autopupulate: true,
    },
    github_link: {
        type: String,
    },
    hosted_link: {
        type: String,
    },
    showcase: {
        type: Boolean,
        default: false,
    },
    archive: {
        type: Boolean,
        default: false,
    },
});

projectsSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Project', projectsSchema);
