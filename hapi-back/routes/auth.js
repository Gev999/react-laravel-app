const Joi = require('@hapi/joi');
const auth = require('../app/Http/controllers/auth');

module.exports = {
	method: 'POST',
	path: '/api/auth/login',
	config: {
		auth: false,
		validate: {
			payload: {
				email: Joi.string().required(),
				password: Joi.string().required()
			}
		}
	},
	handler: async function(request, h) {
		return auth(request, h);
	}
};