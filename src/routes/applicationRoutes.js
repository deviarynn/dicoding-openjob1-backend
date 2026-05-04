const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createApplication, getApplications, getApplicationById,
  getByUser, getByJob, updateApplication, deleteApplication,
} = require('../controllers/applicationController');

// PROTECTED
router.post('/applications', auth, createApplication);
router.get('/applications', auth, getApplications);
router.get('/applications/:id', auth, getApplicationById);
router.get('/applications/user/:userId', auth, getByUser);
router.get('/applications/job/:jobId', auth, getByJob);
router.put('/applications/:id', auth, updateApplication);
router.delete('/applications/:id', auth, deleteApplication);

module.exports = router;
