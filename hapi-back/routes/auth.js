const Joi = require('@hapi/joi');
const { login, socialLogin } = require('app/Http/controllers/auth');

module.exports = [
	{
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
		handler: async (request, h) => login(request, h),
	},
	{
		method: 'POST',
		path: '/api/auth/init',
		handler: async (request, h) => ({user: request.auth.credentials.user})
	},
	{
		method: 'POST',
		path: '/api/auth/provider/user',
		config: {auth: false},
		handler: async (req, h) => socialLogin(req),
	}
]