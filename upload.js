// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Setup storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filter (optional)
const fileFilter = (req, file, cb) => {
  const filetypes = /mp4|avi|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only video files are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

