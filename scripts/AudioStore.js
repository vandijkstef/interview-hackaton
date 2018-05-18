const MongoStore = require('./MongoStore.js');
const uniqid = require('uniqid');

class AudioStore extends MongoStore {
	constructor() {
		super('audio');
	}

	// Actually stores the user
	Store(audioData, callback) {
		delete audioData.type;
		audioData._id = uniqid();
		super.PutUpdate(audioData, (data) => {
			callback(data);
		});
	}

}

module.exports = AudioStore;