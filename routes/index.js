var express = require('express');
var router = express.Router();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'School List' });
});

router.get('/schoolList', function (req, res) {
  client.query(`SELECT * FROM school;`, (err, result) => {
    if (err) console.log(err);
    res.send(JSON.stringify(result.rows));
  });
});

module.exports = router;
