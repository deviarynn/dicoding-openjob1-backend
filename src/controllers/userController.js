const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const isUUID = require('../utils/validateUUID');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users(id,name,email,password)
       VALUES($1,$2,$3,$4)
       RETURNING id,name,email`,
      [uuidv4(), name, email, hashed]
    );

    res.status(201).json({
      status: 'success',
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
}
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(404).json({
      status: 'failed',
      message: 'User tidak ditemukan',
    });
  }

  const result = await pool.query(
    'SELECT id, name, email FROM users WHERE id=$1',
    [id]
  );

  if (!result.rows.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'User tidak ditemukan',
    });
  }

  res.json({
    status: 'success',
    data: result.rows[0],
  });
};