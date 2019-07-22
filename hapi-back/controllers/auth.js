const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
require('dotenv').config();

const User = require('../models').User;
const secret = process.env.JWT_SECRET;

async function Login(req, res) {
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
}

module.exports = Login;