const Joi = require('@hapi/joi');
const { index, show, store, destroy, update, upload }= require('../controllers/companies');

const uri = '/api/companies';

const payload = {
    name: Joi.string().required(),
    email: Joi.string().email(),
    logo: Joi.string(),
    website: Joi.string(),
}

module.exports = [
    {
        method: 'GET',
        path: `${uri}`,
        handler: (request, h) => {
            return index();
        }
    },
    {
        method: 'GET',
        path: `${uri}/{id}`,
        handler: (request, h) => {
            return show(request);
        }
    }, 
    {
        method: 'POST',
        path: `${uri}`,
        config: {
            validate: {
                payload,
            }
        },
        handler: (request, h) => {
            return store(request);
        }
    },
    {
        method: 'PUT',
        path: `${uri}/{id}`,
        config: {
            validate: {
                payload,
            }
        },
        handler: (request, h) => {
            return update(request);
        }
    },
    {
        method: 'DELETE',
        path: `${uri}/{id}`,
        handler: (request, h) => {
            return destroy(request);
        }
    },
    //-------------------------------------------
    {
		method: 'POST',
		path: '/upload',
		config: {
			payload: {
                output: 'stream',
                allow: 'multipart/form-data',
                parse: true,
            },
		},
		handler: async (request, h) => {
            return upload(request);
		}
	},
    {
        method: 'GET',
        path: '/upload/{file*}',
        config: {auth: false},
        handler: {
            directory: {
                path: 'upload'
            }
        }
    }
]