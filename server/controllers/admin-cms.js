const app = require('../app');
const {
    errorHandler,
    validate,
    getOrSetCache,
    flushRedis,
} = require('../utils/helpers');

// schemas
const Bio = require('../models/bio.schema');
const Skill = require('../models/skills.schema');
const Contact = require('../models/contact.schema');

// controllers
// ---- BIO -----
exports.createBio = (req, res, next) => {
    validate(req, res);
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
                flushRedis();
                res.status(200).json({ message: 'Bio created sucessfully' });
            }
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.updateBio = (req, res, next) => {
    validate(req, res);

    const { bio } = req.body;
    const id = req.params.id;

    Bio.findByIdAndUpdate({ _id: id }, { bio })
        .then(() => {
            flushRedis();
            res.status(200).json({ message: 'Bio updated sucessfully' });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.getBio = async (req, res) => {
    const data = await getOrSetCache('bio', async () => {
        const bio = await Bio.findOne().lean();
        if (bio) return bio;
    });

    res.status(200).json({ data });
};

// ----- SKILLS ------
exports.addSkill = (req, res, next) => {
    validate(req, res);

    const { skillName, type, imageUrl } = req.body;

    const skills = new Skill({
        skillName,
        type,
        imageUrl,
    });

    skills
        .save()
        .then(() => {
            flushRedis();
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
            flushRedis();
            res.status(200).json({
                message: `${data.skillName} removed from skills sucessfully.`,
            });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.getSkills = async (req, res) => {
    const skillsByRedis = await getOrSetCache('skills', async () => {
        const skills = await Skill.find().lean();
        if (skills.length > 0) return skills;
    });

    return res.status(200).json({ data: skillsByRedis });
};

// ----- CONTACT ------
exports.addContact = (req, res, next) => {
    validate(req, res);

    const contact = new Contact({ ...req.body });

    contact
        .save()
        .then(() => {
            res.status(200).json({
                message: 'Contact details added sucessfully',
            });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};
exports.updateContact = (req, res, next) => {
    validate(req, res);

    const id = req.params.id;
    Contact.findByIdAndUpdate({ _id: id }, { ...req.body })
        .then(() => {
            res.status(200).json({
                message: 'Contact details updated sucessfully',
            });
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};
