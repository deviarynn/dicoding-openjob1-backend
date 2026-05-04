const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { getAllDocuments, getDocumentById, uploadDocument, deleteDocument } = require('../controllers/documentController');

router.get('/documents', getAllDocuments);
router.get('/documents/:id', getDocumentById);
router.post('/documents', auth, upload.single('document'), uploadDocument);
router.delete('/documents/:id', auth, deleteDocument);

module.exports = router;
