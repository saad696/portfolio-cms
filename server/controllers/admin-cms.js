const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

// schemas
const Bio = require('../models/bio.schema');
const Skill = require('../models/skills.schema');
const Project = require('../models/projects.schema');
const Contact = require('../models/contact.schema');

// helper functions
const errorHandler = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    if (err.response?.data?.error) {
        next(err.response.data.error);
    } else {
        next(err);
    }
};

// controllers
// ---- BIO -----
exports.createBio = (req, res, next) => {
    const { bio } = req.body;

    Bio.countDocuments()
        .then((count) => {
            if (count >= 1) {
                let err = {
                    statusCode: 400,
                    message: 'Cannot create more thane one bios.',
                };
                return errorHandler(err, next);
            } else {
                const bioInstance = new Bio({ bio });
                return bioInstance.save();
            }
        })
        .then((data) => {
            if (data) {
                res.status(200).json({ message: 'Bio created sucessfully' });
            }
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.updateBio = (req, res, next) => {
    const { bio } = req.body;
    const id = req.params.id;

    Bio.findByIdAndUpdate({ _id: id }, { bio })
        .then((data) => {
            res.status(200).json({ message: 'Bio updated sucessfully' });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.getBio = (req, res, next) => {
    Bio.findOne()
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

// ----- SKILLS ------
exports.addSkill = (req, res, next) => {
    const { skillName, type, imageUrl } = req.body;

    const skills = new Skill({
        skillName,
        type,
        imageUrl,
    });

    skills
        .save()
        .then((data) => {
            res.status(200).json({ message: 'Skills added sucessfully' });
        })
        .catch((err) => {
            if (err.message.includes('duplicate key')) {
                err.statusCode = 400;
                err.message = 'Skill with same name already exists';
                errorHandler(err, next);
            } else {
                errorHandler(err, next);
            }
        });
};

exports.removeSkill = (req, res, next) => {
    const id = req.params.id;

    Skill.findByIdAndDelete({ _id: id })
        .then((data) => {
            res.status(200).json({
                message: `${data.skillName} removed from skills sucessfully.`,
            });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.getSkills = (req, res, next) => {
    Skill.find()
        .then((data) => {
            res.status(200).json({
                data,
            });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

// ----- PROJECTS ------
exports.addProject = (req, res, next) => {
    Project.countDocuments().then((count) => {
        if (count >= 10) {
            return res
                .status(405)
                .json({ message: 'Cannot add more projects, limit reached!' });
        }
    });
    const project = new Project({ ...req.body });

    project
        .save()
        .then((data) => {
            res.status(200).json({ message: 'Project added sucessfully' });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.editProject = (req, res, next) => {
    const id = req.params.id;
    Project.findByIdAndUpdate({ _id: id }, { ...req.body })
        .then((data) => {
            res.status(200).json({ message: 'Project updated sucessfully' });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.showcaseProject = (req, res, next) => {
    const id = req.params.id;
    Project.countDocuments({ showcase: true }).then((count) => {
        if (count >= 5) {
            return res
                .status(405)
                .status({ message: 'Cannot list more than 5 projects.' });
        }
    });

    Project.findByIdAndUpdate({ _id: id }, { showcase: true })
        .then((data) => {
            res.status(200).json({ message: 'Project showcased sucessfully' });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.archiveProject = (req, res, next) => {
    const id = req.params.id;
    Project.countDocuments({ showcase: true }).then((count) => {
        if (count === 1) {
            return res.status(405).status({
                message: 'Cannot archive all projects from showcase.',
            });
        }
    });

    Project.findByIdAndUpdate({ _id: id }, { archive: true })
        .then((data) => {
            res.status(200).json({ message: 'Project archived sucessfully' });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.deleteProject = (req, res, next) => {
    const id = req.params.id;
    Project.countDocuments().then((count) => {
        if (count === 1) {
            return res.status(405).status({
                message: 'Cannot delete the last project.',
            });
        }
    });

    Project.findByIdAndDelete({ _id: id })
        .then((data) => {
            res.status(200).json({ message: 'Project deleted sucessfully' });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

// ----- CONTACT ------
exports.addContact = (req, res, next) => {
    const contact = new Contact({ ...req.body });

    contact
        .save()
        .then((data) => {
            res.status(200).json({
                message: 'Contact details added sucessfully',
            });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};
exports.updateContact = (req, res, next) => {
    const id = req.params.id;
    Contact.findByIdAndUpdate({ _id: id }, { ...req.body })
        .then((data) => {
            res.status(200).json({
                message: 'Contact details updated sucessfully',
            });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};
