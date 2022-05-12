const express = require('express');
const { body } = require('express-validator/check');

// local imports
const checkSecret = require('../middlewares/checkSecret');
const adminCmsController = require('../controllers/admin-cms');
const projectController = require('../controllers/project.controller');

const router = express.Router();

// bio
router.post(
    '/create-bio',
    [body('bio').isString().isLength({ min: 20 }).trim()],
    checkSecret,
    adminCmsController.createBio
);
router.put(
    '/update-bio/:id',
    [body('bio').isString().isLength({ min: 20 }).trim()],
    checkSecret,
    adminCmsController.updateBio
);
router.get('/get-bio', checkSecret, adminCmsController.getBio);

// skills
router.post(
    '/add-skill',
    [
        body('skillName').isString().isLength({ min: 1 }).trim(),
        body('type').isString().isLength({ min: 1 }).trim(),
        body('imageUrl').isURL().isLength({ min: 1 }).trim(),
    ],
    checkSecret,
    adminCmsController.addSkill
);
router.delete('/remove-skill/:id', checkSecret, adminCmsController.removeSkill);
router.get('/get-skills', checkSecret, adminCmsController.getSkills);

// projects
router.post(
    '/add-project',
    [
        body('projectName').isString().isLength({ min: 1 }).trim(),
        body('desc').isString().isLength({ min: 20 }).trim(),
        body('type').isString().isLength({ min: 1 }).trim(),
        body('technologies_used').isString().isLength({ min: 1 }).trim(),
        body('github_link').isString().isLength({ min: 1 }).trim(),
        body('hosted_link').isString().isLength({ min: 1 }).trim(),
    ],
    checkSecret,
    projectController.addProject
);
router.put(
    '/edit-project/:id',
    [
        body('projectName').isString().isLength({ min: 1 }).trim(),
        body('desc').isString().isLength({ min: 20 }).trim(),
        body('type').isString().isLength({ min: 1 }).trim(),
        body('technologies_used').isString().isLength({ min: 1 }).trim(),
        body('github_link').isString().isLength({ min: 1 }).trim(),
        body('hosted_link').isString().isLength({ min: 1 }).trim(),
    ],
    checkSecret,
    projectController.editProject
);
router.patch(
    '/showcase-project/:id',
    checkSecret,
    projectController.showcaseProject
);
router.patch(
    '/archive-project/:id',
    checkSecret,
    projectController.archiveProject
);
router.delete(
    '/delete-project/:id',
    checkSecret,
    projectController.deleteProject
);

router.get('/get-projects', checkSecret, projectController.deleteProject);

// contact
router.post(
    '/add-contact',
    [
        body('email').isString().isLength({ min: 1 }).trim(),
        body('mobile').isString().isLength({ min: 10 }).trim(),
        body('github_url').isString().isLength({ min: 1 }).trim(),
        body('linkedin_url').isString().isLength({ min: 1 }).trim(),
    ],
    checkSecret,
    adminCmsController.addContact
);
router.put(
    '/edit-contact',
    [
        body('email').isString().isLength({ min: 1 }).trim(),
        body('mobile').isString().isLength({ min: 10 }).trim(),
        body('github_url').isString().isLength({ min: 1 }).trim(),
        body('linkedin_url').isString().isLength({ min: 1 }).trim(),
    ],
    checkSecret,
    adminCmsController.updateContact
);
module.exports = router;
