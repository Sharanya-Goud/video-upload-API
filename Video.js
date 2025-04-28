const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoPath: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    default: '',
  },
  report: {
    type: String,
    default: '',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  processed: {
    type: Boolean,
    default: false,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Video', videoSchema);


