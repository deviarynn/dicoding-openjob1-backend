const express = require('express');
const router = express.Router();
const pool = require('../config/db');

const { register } = require('../controllers/userController');
const { getUserById } = require('../controllers/userController');

const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { registerSchema } = require('../validations/userValidation');

router.post('/users', validate(registerSchema), register);
router.get('/users/:id', getUserById);

router.get('/profile', auth, async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email FROM users WHERE id=$1',
    [req.user.id]
  );

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'User tidak ditemukan',
    });
  }

  const user = result.rows[0];

  res.json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name, 
      email: user.email,
      role: 'user'
    },
  });
});

router.get('/profile/applications', auth, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT * FROM applications WHERE user_id=$1`,
      [req.user.id]
    );

    res.json({
      status: 'success',
      data: {
        applications: result.rows, 
      },
    });
  } catch (err) { next(err); }
});

router.get('/profile/bookmarks', auth, async (req, res, next) => { // tambahkan next
  try {
    const result = await pool.query(
      `SELECT * FROM bookmarks WHERE user_id=$1`,
      [req.user.id]
    );

    res.json({
      status: 'success',
      data: {
        bookmarks: result.rows, // DIBUNGKUS DALAM OBJEK bookmarks
      },
    });
  } catch (err) { next(err); }
});

module.exports = router;
