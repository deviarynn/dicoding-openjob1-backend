const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ 
        status: 'failed', 
        message: 'Email dan password wajib diisi dengan format string' 
      });
    }

    const user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

    if (!user.rows || user.rows.length === 0) {
      return res.status(401).json({
        status: 'failed', 
        message: 'User tidak ditemukan',
      });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) {
      return res.status(401).json({
        status: 'failed', 
        message: 'Password salah',
      });
    }

    const accessToken = jwt.sign(
      { id: user.rows[0].id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' }
    );

    const refreshToken = jwt.sign(
      { id: user.rows[0].id },
      process.env.REFRESH_TOKEN_KEY
    );

    await pool.query(
      'INSERT INTO authentications(id, user_id, refresh_token) VALUES($1,$2,$3)',
      [uuidv4(), user.rows[0].id, refreshToken]
    );

    res.status(200).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        status: 'failed', 
        message: 'refreshToken wajib diisi',
      });
    }

    const check = await pool.query(
      'SELECT * FROM authentications WHERE refresh_token=$1',
      [refreshToken]
    );

    if (!check.rows.length) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid refresh token',
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY
    );

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' }
    );

    res.json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: 'failed',
        message: 'refreshToken wajib diisi',
      });
    }

    const result = await pool.query(
      'DELETE FROM authentications WHERE refresh_token=$1',
      [refreshToken]
    );

    if (!result.rowCount) {
      return res.status(400).json({
        status: 'failed',
        message: 'Refresh token tidak ditemukan',
      });
    }

    res.json({
      status: 'success',
      message: 'Logout berhasil',
    });
  } catch (err) {
    next(err);
  }
};