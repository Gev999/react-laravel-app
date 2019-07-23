const Joi = require('@hapi/joi');
const { index, show, store, destroy, update }= require('../controllers/companies');
const fs = require('fs')

const uri = '/api/companies';

const payload = {
    name: Joi.string().required(),
    email: Joi.string().email(),
    logo: Joi.string(),
    website: Joi.string(),
}

const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
        const filename = file.hapi.filename
        const data = file._data
        fs.writeFile('./upload/' + filename, data, err => {
            if (err) {
                reject(err)
            }
            resolve({ message: 'Upload successfully!' })
        })
    })
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
            const { payload } = request;
            const response = handleFileUpload(payload.file);
            return response;
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