const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const { uploadVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

// 🧱 Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|avi|mov|mkv/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Correct route with middleware
router.post('/upload', protect, upload.single('video'), uploadVideo);

module.exports = router;




