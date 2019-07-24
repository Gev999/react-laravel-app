const Employee = require('app/models').Employee;
const { 
    getAll, 
    getOne, 
    createItem, 
    updateItem, 
    deleteItem,
} = require('app/services/crud');

module.exports = {

    index: () => getAll(Employee),

    show: (req) => getOne(req.params.id, Employee),

    store: (req) => createItem(req.payload, Employee),

    update: (req) => updateItem(req.params.id, req.payload, Employee),

    destroy: (req) => deleteItem(req.params.id, Employee), 

}