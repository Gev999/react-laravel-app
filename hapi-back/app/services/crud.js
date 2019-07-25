const Boom = require('@hapi/boom');
const fs = require('fs');

module.exports = {

    getAll: async (model) => {
        try {
            const items = await model.findAll();
            if (items) {
                items.forEach(item=>{
                    item.dataValues.logo = getImageFullPath(item.dataValues.logo);
                })
                return items;
            }
        }
        catch (err) {
            return err;
        }
    },

    getOne: async (id, model) => {
        try {
            const item= await model.findOne({ where: { id }, raw: true });
            if (item) {
                item.logo = getImageFullPath(item.logo);
                return item;
            } else {
                return new Boom(null, { statusCode: 404 });
            }
        }
        catch (err) {
            return err;
        }
    },

    createItem: async (data, model) => {
        try {
            console.log(data);
            
            const newItem = await model.create(data);
            if (newItem) {
                return 'Created succesfully';
            }
        }
        catch (err) {
            return err;
        }
    },

    updateItem: async (id, data, model) => {
        try {
            const item = await model.findOne({ where: { id }, raw: true });
            if (item) {
                if (data.logo) {
                    fs.unlinkSync(`public/upload/${item.logo}`);
                }
                await model.update(data, { where: { id } });
                return 'Updated succesfully';
            } else {
                return new Boom(null, { statusCode: 404 });
            }
        }
        catch(err) {
            return err;
        }
    },

    deleteItem: async (id, model) => {
        try {
            const item = await model.findOne({ where: { id }, raw: true });
            if (item) {
                if (item.logo) {
                    fs.unlinkSync(`public/upload/${item.logo}`);
                }
                await model.destroy({ where: { id } });
                return 'Deleted successfully';
            } else {
                return new Boom(null, { statusCode: 404 })
            }
        }
        catch (err) {
            return err;
        }
    },

    handleFileUpload: file => {
        return new Promise((resolve, reject) => {
            const filename = file.hapi.filename
            const data = file._data
            const imgName = new Date().getTime() + filename
            fs.writeFile('./public/upload/' + imgName, data, err => {
                if (err) {
                    reject(err)
                }
                resolve({ logo: imgName })
            })
        })
    }
}

const getImageFullPath = (image) => {
    return image ? `http://127.0.0.1:8080/upload/${image}` : `http://127.0.0.1:8080/upload/default.png`
}