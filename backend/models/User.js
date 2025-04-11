const mongoose = require('mongoose');
const roles = require('../constants/roles');

const UserSchema = mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: roles.USER,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
