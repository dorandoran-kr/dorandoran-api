const express = require('express');

const { upload } = require('../middlewares/upload');

const router = express.Router();

router.post('/', upload.single("mp3"), (req, res) => {
  res.json({ directory: req.file.location });
})

module.exports = router;