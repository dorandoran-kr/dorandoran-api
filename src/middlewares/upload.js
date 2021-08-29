const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'ap-northeast-2',
})

exports.upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'yummeal-image',
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  // limits: { fileSize: 50 * 1024 * 1024 },
});