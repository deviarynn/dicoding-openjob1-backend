const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const isUUID = require('../utils/validateUUID');

exports.createCompany = async (req, res, next) => {
  try {
    const { name, description, location } = req.body;
    const result = await pool.query(
      'INSERT INTO companies(id,name,description,location) VALUES($1,$2,$3,$4) RETURNING *',
      [uuidv4(), name, description, location]
    );
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

exports.getCompanies = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM companies');

    res.json({
      status: 'success',
      data: {
        companies: result.rows, 
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(404).json({
        status: 'failed',
        message: 'Company tidak ditemukan',
      });
    }

    const result = await pool.query(
      'SELECT * FROM companies WHERE id=$1',
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        status: 'failed',
        message: 'Company tidak ditemukan',
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

exports.updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(404).json({
        status: 'failed',
        message: 'Company tidak ditemukan',
      });
    }

    const { name, description, location } = req.body;

    const result = await pool.query(
      `UPDATE companies 
       SET name=$1, description=$2, location=$3 
       WHERE id=$4 RETURNING *`,
      [name, description, location, id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        status: 'failed',
        message: 'Company tidak ditemukan',
      });
    }

    res.json({
      status: 'success',
      message: 'Company berhasil diupdate',
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(404).json({
        status: 'failed',
        message: 'Company tidak ditemukan',
      });
    }

    const result = await pool.query(
      'DELETE FROM companies WHERE id=$1',
      [id]
    );

    if (!result.rowCount) {
      return res.status(404).json({
        status: 'failed',
        message: 'Company tidak ditemukan',
      });
    }

    res.json({
      status: 'success',
      message: 'Company berhasil dihapus',
    });
  } catch (err) {
    next(err);
  }
};