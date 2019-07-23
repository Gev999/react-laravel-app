const Joi = require('@hapi/joi');
const { index, show, store, destroy, update }= require('../app/Http/controllers/employees');

const uri = '/api/employees';

const payload = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    company_id: Joi.number().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
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
]