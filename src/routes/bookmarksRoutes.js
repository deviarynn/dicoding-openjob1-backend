const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  deleteBookmark,
} = require('../controllers/bookmarksController');

// PROTECTED
router.post('/jobs/:jobId/bookmark', auth, createBookmark);
router.get('/bookmarks', auth, getBookmarks);
router.get('/jobs/:jobId/bookmark/:id', auth, getBookmarkById);
router.delete('/jobs/:jobId/bookmark', auth, deleteBookmark);

module.exports = router;