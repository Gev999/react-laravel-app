require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
const User = require('app/models').User;
const secret = process.env.JWT_SECRET;

module.exports = {

	login: async (req, res) => {
		const { email, password } = req.payload;
		try {
			const user = await User.findOne({ where: { email }, raw: true });
			if (user) {
				let match = bcrypt.compareSync(password, user.password);
				if (match) {
					const token = jwt.sign({ user }, secret, { expiresIn: '7d' });
					const response = {
						"access_token": token
					};
					return response;
				} else {
					return new Boom('Wrong password', { statusCode: 400 });
				}
			} else {
				return new Boom('Wrong login', { statusCode: 400 });
			}
		} catch (err) {
			return err;
		}
	},

	socialLogin: async (req) => {
		const { name, email, provider, googleId: provider_id } = req.payload;
		try {
			let user = await User.findOne({ where: { email }, raw: true });
			if (!user) {
				user = await User.create({
					name, email, provider, provider_id
				});
			}
			const token = jwt.sign({ user }, secret, { expiresIn: '7d' });
			const response = {
				"access_token": token
			};
			return response;
		}
		catch(err) {
			return err;
		}
	}
};