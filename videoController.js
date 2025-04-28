






// controllers/videoController.js


exports.uploadVideo = async (req, res) => {
  try {
    console.log('Received file:', req.file); // Debug log

    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const { title, description } = req.body;

    // Save video metadata to DB here (optional)
    return res.status(200).json({
      message: 'Video uploaded successfully',
      file: req.file.filename,
      title,
      description,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
