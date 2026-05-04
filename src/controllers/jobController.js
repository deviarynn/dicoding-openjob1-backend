const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const isUUID = require('../utils/validateUUID');

// CREATE
exports.createJob = async (req, res, next) => {
  try {
    const {
      company_id, category_id, title, description,
      job_type, experience_level, location_type, location_city,
      salary_min, salary_max, is_salary_visible, status,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO jobs(id, company_id, category_id, title, description,
        job_type, experience_level, location_type, location_city,
        salary_min, salary_max, is_salary_visible, status)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [uuidv4(), company_id, category_id, title, description,
       job_type, experience_level, location_type, location_city,
       salary_min, salary_max, is_salary_visible, status]
    );

    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

// GET ALL + FILTER (parameterized - aman dari SQL injection)
exports.getJobs = async (req, res, next) => {
  try {
    const { title, 'company-name': companyName } = req.query;

    let query = `
      SELECT jobs.*, companies.name as company_name
      FROM jobs
      LEFT JOIN companies ON jobs.company_id = companies.id
      WHERE 1=1
    `;
    const params = [];

    if (title) {
      params.push(`%${title}%`);
      query += ` AND jobs.title ILIKE $${params.length}`;
    }
    if (companyName) {
      params.push(`%${companyName}%`);
      query += ` AND companies.name ILIKE $${params.length}`;
    }

    const result = await pool.query(query, params);
    res.json({ 
      status: 'success', 
      data: { jobs: result.rows } 
    });
  } catch (err) { next(err); }
};

// GET BY ID
exports.getJobById = async (req, res, next) => {
  try {
      const { id } = req.params;
  
      if (!isUUID(id)) {
        return res.status(404).json({
          status: 'failed',
          message: 'Job tidak ditemukan',
        });
      }
  
      const result = await pool.query(
        'SELECT * FROM jobs WHERE id=$1',
        [id]
      );
  
      if (!result.rows.length) {
        return res.status(404).json({
          status: 'failed',
          message: 'Job tidak ditemukan',
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

// GET BY COMPANY ID
exports.getJobsByCompanyId = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    if (!isUUID(companyId)) {
      return res.status(200).json({ 
        status: 'success', 
        data: { jobs: [] } 
      });
    }

    const result = await pool.query('SELECT * FROM jobs WHERE company_id=$1', [companyId]);
    res.json({ 
      status: 'success', 
      data: { jobs: result.rows } 
    });
  } catch (err) { next(err); }
};

exports.getJobsByCategoryId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!isUUID(categoryId)) {
      return res.status(200).json({ 
        status: 'success', 
        data: { jobs: [] } 
      });
    }

    const result = await pool.query('SELECT * FROM jobs WHERE category_id=$1', [categoryId]);
    res.json({ 
      status: 'success', 
      data: { jobs: result.rows } 
    });
  } catch (err) { next(err); }
};

// UPDATE
exports.updateJob = async (req, res, next) => {
  try {
    const fields = req.body;
    const keys = Object.keys(fields);
    if (!keys.length) return res.status(400).json({ status: 'failed', message: 'No data to update' });

    const setQuery = keys.map((key, i) => `${key}=$${i + 1}`).join(', ');
    const result = await pool.query(
      `UPDATE jobs SET ${setQuery} WHERE id=$${keys.length + 1} RETURNING *`,
      [...Object.values(fields), req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ status: 'failed', message: 'Job tidak ditemukan' });
    res.json({ status: 'success', message: 'Job berhasil diupdate', data: result.rows[0] });
  } catch (err) { next(err); }
};


// DELETE
exports.deleteJob = async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM jobs WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ status: 'failed', message: 'Job tidak ditemukan' });
    res.json({ status: 'success', message: 'Job berhasil dihapus' });
  } catch (err) { next(err); }
};
