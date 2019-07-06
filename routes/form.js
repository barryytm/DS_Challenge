var express = require('express');
var router = express.Router();
const aws = require('aws-sdk');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('form', { title: 'School Registraion Form' });
});

router.post('/createSchool', (req, res) => {
  const input = req.body;
  const image = req.files.image;
  uploadToS3(image);
  client.query(`INSERT INTO school VALUES ('${input.name}', '${input.about}', '${input.school}', '${input.location}', '${req.files.image.name}');`, (err, result) => {
    if (err) console.log(err);
    res.redirect('/');
  });
});

function uploadToS3(file) {
  let s3bucket = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.S3_BUCKET
  });
  var params = {
    Bucket: process.env.S3_BUCKET,
    Key: file.name,
    Body: file.data
  };
  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log('error in callback');
      console.log(err);
    }
    console.log('success');
    console.log(data);
  });
}

module.exports = router;
