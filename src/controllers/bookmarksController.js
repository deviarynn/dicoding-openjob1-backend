const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const isUUID = require('../utils/validateUUID');

exports.createBookmark = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const job_id = req.params.jobId;
    const result = await pool.query(
      'INSERT INTO bookmarks(id,user_id,job_id) VALUES($1,$2,$3) RETURNING *',
      [uuidv4(), user_id, job_id]
    );
    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

exports.getBookmarks = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM bookmarks WHERE user_id=$1', [req.user.id]);
    res.json({ 
      status: 'success', 
      data: { bookmarks: result.rows } 
    });
  } catch (err) { next(err); }
};

exports.getBookmarkById = async (req, res, next) => {
  try {
    const { jobId, id } = req.params;
    if (!isUUID(jobId) || !isUUID(id)) return res.status(404).json({ status: 'failed', message: 'Data tidak ditemukan' });
    const result = await pool.query('SELECT * FROM bookmarks WHERE id=$1 AND job_id=$2', [id, jobId]);
    if (!result.rows.length) return res.status(404).json({ status: 'failed', message: 'Data tidak ditemukan' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

exports.deleteBookmark = async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM bookmarks WHERE user_id=$1 AND job_id=$2',
      [req.user.id, req.params.jobId]
    );
    if (!result.rowCount) return res.status(404).json({ status: 'failed', message: 'Bookmark tidak ditemukan' });
    res.json({ status: 'success', message: 'Bookmark berhasil dihapus' });
  } catch (err) { next(err); }
};
