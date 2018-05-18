const express = require('express');
const router = express.Router();
const UserStore = require('../scripts/UserStore.js');
const AudioStore = require('../scripts/AudioStore.js');
var questions = require('./questions.js');

router.get('/', function(req, res, next) {
	res.render('index', {data: questions});
});

router.post('/', function(req, res) {
	if (req.body.type === 'user') {
		const userStore = new UserStore();
		userStore.Store(req.body, (data) => {
			res.send(JSON.stringify(req.body));
		});
	} else if (req.body.type === 'audio') {
		const audioStore = new AudioStore();
		audioStore.Store(req.body, (data) => {
			res.send(JSON.stringify(req.body));
		});
	} else {
		res.send(JSON.stringify({
			error: 'unspecfied type'
		}));
	}
});

module.exports = router;
