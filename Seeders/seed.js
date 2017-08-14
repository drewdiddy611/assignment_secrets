const mongoose = require('mongoose');
const { User, Secret } = require('../models');
const connect = require('../mongo');

connect().then(seed);
async function seed(db) {
	console.log('Creating Users');

	console.log('Creating Secrets');
	const secrets = [];
	for (let i = 1; i < 5; i++) {
		var secret = await Secret.create({
			owner: i % 3,
			encryption: i,
			body: `This is a post! ${i}`
		});
		secrets.push(secret);
		console.log('saving secret');
	}

	for (let i = 1; i < 3; i++) {
		var user = await User.create({
			username: `user${i}`,
			email: `email${i}@gmail.com`,
			password: `password${i}`,
			secrets: secrets
		});
		console.log('saving user');
	}

	mongoose.disconnect();
}
