const Project = require('../models/projects.schema');
const { errorHandler, validate, getOrSetCache } = require('../utils/helpers');

// ----- PROJECTS ------
exports.addProject = (req, res, next) => {
    validate(req, res);

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
    validate(req, res);

    const id = req.params.id;
    Project.findByIdAndUpdate({ _id: id }, { ...req.body })
        .then((data) => {
            res.status(200).json({ message: 'Project updated sucessfully' });
            flushRedis();
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
            flushRedis();
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
            flushRedis();
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
            flushRedis();
        })
        .catch((err) => {
            errorHandler(err, next);
        });
};

exports.getProject = async (req, res, next) => {
    const data = await getOrSetCache('projects', async () => {
        const projects = await Project.find({ showcase: true }).lean();
        if (projects.length > 0) return projects;
    });

    return res.status(200).json({ data: data });
};
