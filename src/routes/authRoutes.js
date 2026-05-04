const express = require('express');
const router = express.Router();

const { login, refreshToken, logout } = require('../controllers/authController');
const auth = require('../middlewares/auth'); 
console.log({ login, refreshToken, logout });
// LOGIN
router.post('/authentications', login);

// REFRESH TOKEN
router.put('/authentications', refreshToken);

// LOGOUT
router.delete('/authentications', auth, logout);

module.exports = router;