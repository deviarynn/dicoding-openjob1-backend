const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createJobSchema, updateJobSchema } = require('../validations/jobValidation');
const {
  createJob, getJobs, getJobById, updateJob, deleteJob,
  getJobsByCompanyId, getJobsByCategoryId,
} = require('../controllers/jobController');

router.get('/jobs', getJobs);
router.get('/jobs/company/:companyId', getJobsByCompanyId);   
router.get('/jobs/category/:categoryId', getJobsByCategoryId); 
router.get('/jobs/:id', getJobById);                           

// PROTECTED
router.post('/jobs', auth, validate(createJobSchema), createJob);
router.put('/jobs/:id', auth, validate(updateJobSchema), updateJob);
router.delete('/jobs/:id', auth, deleteJob);

module.exports = router;
