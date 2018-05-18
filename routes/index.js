var express = require('express');
var router = express.Router();
var questions = require('./questions.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {data: questions});
});

router.post('/', function(req, res) {
	console.log(req.body);
	res.send(JSON.stringify(req.body));
});

module.exports = router;
