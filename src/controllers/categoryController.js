const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const isUUID = require('../utils/validateUUID');

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO categories(id,name) VALUES($1,$2) RETURNING *', [uuidv4(), name]);
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

exports.getCategories = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json({ 
      status: 'success', 
      data: { categories: result.rows } 
    });
  } catch (err) { next(err); }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(404).json({
        status: 'failed',
        message: 'Category tidak ditemukan',
      });
    }

    const result = await pool.query(
      'SELECT * FROM categories WHERE id=$1',
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        status: 'failed',
        message: 'Category tidak ditemukan',
      });
    }

    res.json({
      status: 'success',
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(404).json({
        status: 'failed',
        message: 'Category tidak ditemukan',
      });
    }

    const { name } = req.body;

    const result = await pool.query(
      'UPDATE categories SET name=$1 WHERE id=$2 RETURNING *',
      [name, id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        status: 'failed',
        message: 'Category tidak ditemukan',
      });
    }

    res.json({
      status: 'success',
      message: 'Category berhasil diupdate',
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(404).json({
        status: 'failed',
        message: 'Category tidak ditemukan',
      });
    }

    const result = await pool.query(
      'DELETE FROM categories WHERE id=$1',
      [id]
    );

    if (!result.rowCount) {
      return res.status(404).json({
        status: 'failed',
        message: 'Category tidak ditemukan',
      });
    }

    res.json({
      status: 'success',
      message: 'Category berhasil dihapus',
    });
  } catch (err) {
    next(err);
  }
};
