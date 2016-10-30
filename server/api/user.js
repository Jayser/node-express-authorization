const crypto = require('crypto');
const User = require('../db/models/User');

exports.createUser = userData => {
	const user = {
		username: userData.name,
		password: hash(userData.password)
	};
	return new User(user).save();
};

exports.getUser = id =>  {
	return User.findOne(id);
};

exports.checkUser = userData => {
	return User
		.findOne({username: userData.name})
		.then(doc => {
			if (doc.password == hash(userData.password) ){
				console.log("User password is ok");
				return Promise.resolve(doc)
			} else {
				return Promise.reject("Error wrong")
			}
		});
};

function hash(text) {
	return crypto.createHash('sha1')
	.update(text).digest('base64')
}
