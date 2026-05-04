const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const isUUID = require('../utils/validateUUID');
const { application } = require('express');

// APPLY JOB
exports.createApplication = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { job_id } = req.body;
    const result = await pool.query(
      'INSERT INTO applications(id,user_id,job_id) VALUES($1,$2,$3) RETURNING *',
      [uuidv4(), user_id, job_id]
    );
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

// GET ALL
exports.getApplications = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM applications');
    res.json({ 
      status: 'success', 
      data: { applications: result.rows } 
    });
  } catch (err) { next(err); }
};

// GET BY ID
exports.getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(404).json({ status: 'failed', message: 'Data tidak ditemukan' });
    const result = await pool.query('SELECT * FROM applications WHERE id=$1', [id]);
    if (!result.rows.length) return res.status(404).json({ status: 'failed', message: 'Data tidak ditemukan' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

// BY USER
exports.getByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!isUUID(userId)) {
      return res.status(200).json({ 
        status: 'success', 
        data: { applications: [] } 
      });
    }

    const result = await pool.query('SELECT * FROM applications WHERE user_id=$1', [userId]);
    res.json({ 
      status: 'success', 
      data: { applications: result.rows } 
    });
  } catch (err) { next(err); }
};

exports.getByJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    if (!isUUID(jobId)) {
      return res.status(200).json({ 
        status: 'success', 
        data: { applications: [] } 
      });
    }

    const result = await pool.query('SELECT * FROM applications WHERE job_id=$1', [jobId]);
    res.json({ 
      status: 'success', 
      data: { applications: result.rows } 
    });
  } catch (err) { next(err); }
};


// UPDATE STATUS
exports.updateApplication = async (req, res, next) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE applications SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ status: 'failed', message: 'Application tidak ditemukan' });
    res.json({ 
      status: 'success', 
      message: 'Application berhasil diupdate',
      data: result.rows[0] 
    });
  } catch (err) { next(err); }
};

// DELETE
exports.deleteApplication = async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM applications WHERE id=$1', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ status: 'failed', message: 'Application tidak ditemukan' });
    res.json({ status: 'success', message: 'Application berhasil dihapus' });
  } catch (err) { next(err); }
};
