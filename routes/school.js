var express = require('express');
var router = express.Router();
var fs = require('fs');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('school', { title: 'School' });
});

router.post('/updateSchool', (req, res) => {
  console.log(req.body);
  let input = req.body;
  client.query(`DELETE FROM school WHERE school.name = '${input.oName}';`, (err, result) => {
    if (err) console.log(err);
    client.query(`INSERT INTO school VALUES ('${input.name}', '${input.about}', '${input.school}', '${input.location}', '${input.image}');`, (err, result) => {
      if (err) console.log(err);
      res.redirect('/');
    });
  });
});

module.exports = router;
