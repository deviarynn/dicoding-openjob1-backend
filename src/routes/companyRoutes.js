const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const { companySchema } = require('../validations/companyValidation');

const auth = require('../middlewares/auth');

const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

// PUBLIC
router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);

// PROTECTED
router.post('/companies', auth, validate(companySchema), createCompany);
router.put('/companies/:id', auth, validate(companySchema), updateCompany);
router.delete('/companies/:id', auth, deleteCompany);

module.exports = router;