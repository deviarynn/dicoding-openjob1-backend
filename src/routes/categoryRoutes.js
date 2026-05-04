const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const validate = require('../middlewares/validate');
const { categorySchema } = require('../validations/categoryValidation');

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);

router.post('/categories', auth, validate(categorySchema), createCategory);
router.put('/categories/:id', auth, validate(categorySchema), updateCategory);
router.delete('/categories/:id', auth, deleteCategory);

module.exports = router;