const express = require('express');
const router = express.Router();
const UserStore = require('../scripts/UserStore.js');
const AudioStore = require('../scripts/AudioStore.js');
const questions = require('./questions.js');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __basedir + '/public/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.wav');
	}
});
const upload = multer({ storage: storage });

router.get('/', function(req, res) {
	res.render('index', {data: questions});
});

router.post('/', upload.single('audio'), function(req, res) {
	console.log(req.body);
	console.log(req.file);
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

router.get('/test', function(req, res) {
	res.render('test', {data: questions});
});

module.exports = router;
