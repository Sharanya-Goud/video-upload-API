/*const Video = require('../models/videoModel');
const asyncHandler = require('express-async-handler');

const uploadVideo = asyncHandler(async (req, res) => {
  const { videoPath, classification, report } = req.body;

  const video = await Video.create({
    uploadedBy: req.user._id,
    videoPath,
    classification,
    report,
  });

  //res.status(201).json(video);
  // After saving the video document
  const savedVideo = await video.save();
  res.status(201).json(savedVideo);

});*/

/*const Video = require('../models/videoModel');
const asyncHandler = require('express-async-handler');
const path = require('path');

const uploadVideo = asyncHandler(async (req, res) => {
  console.log('Received file:', req.file);

  if (!req.file) {
    return res.status(400).json({ message: 'No video file uploaded' });
  }

  const videoPath = req.file.path.replace(/\\/g, '/'); // Normalize for cross-platform

  const video = new Video({
    videoPath,
    uploadedBy: req.user._id,
    classification: '',
    report: '',
  });

  const savedVideo = await video.save();

  res.status(201).json({
    message: 'Video uploaded successfully',
    videoId: savedVideo._id,
    videoPath: savedVideo.videoPath,
  });
});*/

// controllers/uploadController.js

const Video = require('../models/videoModel');
const asyncHandler = require('express-async-handler');
const path = require('path');

const uploadVideo = asyncHandler(async (req, res) => {
  console.log('Received file:', req.file);

  if (!req.file) {
    return res.status(400).json({ message: 'No video file uploaded' });
  }

  const filepath = req.file.path.replace(/\\/g, '/'); // Normalize path for Windows/Linux

  const video = new Video({
    filename: req.file.filename,
    filepath: filepath,
    uploadedBy: req.user._id,
    processed: false,
  });

  const savedVideo = await video.save();

  res.status(201).json({
    message: 'Video uploaded successfully',
    videoId: savedVideo._id,
    filename: savedVideo.filename,
    filepath: savedVideo.filepath,
  });
});

module.exports = { uploadVideo };





