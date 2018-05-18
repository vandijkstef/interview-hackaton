const express = require('express');
const router = express.Router();
const UserStore = require('../scripts/UserStore.js');
const AudioStore = require('../scripts/AudioStore.js');
const questions = require('./questions.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', function(req, res) {
	res.render('index', {data: questions});
});

router.post('/', upload.single('theBlob'), function(req, res) {
	if (req.body.type === 'user') {
		const userStore = new UserStore();
		userStore.Store(req.body, () => {
			res.send(JSON.stringify(req.body));
		});
	} else if (req.body.type === 'audio') {
		const audioStore = new AudioStore();
		console.log(req.body);
		audioStore.Store(req.body, () => {
			res.send(JSON.stringify(req.body));
		});
	} else {
		res.send(JSON.stringify({
			error: 'unspecfied type'
		}));
	}
});

module.exports = router;
