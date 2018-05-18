const MongoStore = require('./MongoStore.js');
const uniqid = require('uniqid');

class UserStore extends MongoStore {
	constructor() {
		super('users');
	}

	// Actually stores the user
	Store(user, callback) {
		delete user.type;
		user._id = uniqid();
		super.PutUpdate(user, (data) => {
			callback(data);
		});
	}

}

module.exports = UserStore;