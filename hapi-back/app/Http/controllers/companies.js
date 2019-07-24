const Company = require('app/models').Company;
const { 
    getAll, 
    getOne, 
    createItem, 
    updateItem, 
    deleteItem,
    handleFileUpload
} = require('app/services/crud');

const fs = require('fs');

module.exports = {

    index: () => getAll(Company),

    show: (req) => getOne(req.params.id, Company),

    store: (req) => createItem(req.payload, Company),

    update: (req) => updateItem(req.params.id, req.payload, Company),

    destroy: (req) => deleteItem(req.params.id, Company), 

    upload: async (req) => await handleFileUpload(req.payload.file),
}

