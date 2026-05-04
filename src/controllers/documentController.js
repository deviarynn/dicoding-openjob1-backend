const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

exports.getAllDocuments = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
    res.json({ 
      status: 'success', 
      data: { documents: result.rows } 
    });
  } catch (err) { next(err); }
};

exports.getDocumentById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM documents WHERE id=$1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ status: 'failed', message: 'Document tidak ditemukan' });
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) { next(err); }
};

exports.uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ status: 'failed', message: 'File wajib diupload' });
    const id = uuidv4();
    await pool.query(
      'INSERT INTO documents(id,user_id,filename,original_name,path) VALUES($1,$2,$3,$4,$5)',
      [id, req.user.id, req.file.filename, req.file.originalname, req.file.path]
    );
    res.status(201).json({ status: 'success', data: { documentId: id } });
  } catch (err) { next(err); }
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM documents WHERE id=$1 RETURNING path', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ status: 'failed', message: 'Document tidak ditemukan' });
    const filePath = result.rows[0].path;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.json({ status: 'success', message: 'Document berhasil dihapus' });
  } catch (err) { next(err); }
};
