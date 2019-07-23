const Boom = require('@hapi/boom');
const Company = require('../models').Company;
const fs = require('fs');
//const path = require('path');

module.exports = {

    index: async () => {
        try {
            const companies = await Company.findAll();
            if (companies) {
                return companies;
            }
        }
        catch (err) {
            return err;
        }
    },

    show: async (req) => {
        const { id } = req.params;
        try {
            const company = await Company.findOne({ where: { id }, raw: true });
            if (company) {
                return company;
            } else {
                return new Boom('Company with such id does not exist', { statusCode: 404 });
            }
        }
        catch (err) {
            return err;
        }
    },

    store: async (req) => {
        try {
            const newCompany = await Company.create(req.payload);
            if (newCompany) {
                return 'Company created succesfully';
            }
        }
        catch (err) {
            return err;
        }
    },

    update: async (req) => {
        const { id } = req.params;
        try {
            const company = await Company.findOne({ where: { id }, raw: true });
            if (company) {
                await Company.update(req.payload, { where: { id } });
                return 'Company updated succesfully';
            } else {
                return new Boom('Company with such id does not exist', { statusCode: 404 });
            }
        }
        catch(err) {
            return err;
        }
    },

    destroy: async (req) => {
        const { id } = req.params;
        try {
            const company = await Company.findOne({ where: { id }, raw: true });
            if (company) {
                await Company.destroy({ where: { id } });
                return 'Company deleted successfully';
            } else {
                return new Boom('Company with such id does not exist', { statusCode: 404 })
            }
        }
        catch (err) {
            return err;
        }
    },

    upload: async (req) => {
        const response = await handleFileUpload(req.payload.file);
        return response;
    }
}

const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
        const filename = file.hapi.filename
        const data = file._data
        const imgName = new Date().getTime() + filename
        fs.writeFile('./upload/' + imgName, data, err => {
            if (err) {
                reject(err)
            }
            resolve({ logo: imgName })
        })
    })
}
