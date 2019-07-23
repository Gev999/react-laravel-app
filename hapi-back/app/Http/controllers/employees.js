const Boom = require('@hapi/boom');
const Employee = require('../../models').Employee;

module.exports = {

    index: async () => {
        try {
            const employees = await Employee.findAll();
            if (employees) {
                return employees;
            }
        }
        catch (err) {
            return err;
        }
    },

    show: async (req) => {
        const { id } = req.params;
        try {
            const employee = await Employee.findOne({ where: { id }, raw: true });
            if (employee) {
                return employee;
            } else {
                return new Boom('Employee with such id does not exist', { statusCode: 404 });
            }
        }
        catch (err) {
            return err;
        }
    },

    store: async (req) => {
        try {
            const newEmployee = await Employee.create(req.payload);
            if (newEmployee) {
                return 'Employee created succesfully';
            }
        }
        catch (err) {
            return err;
        }
    },

    update: async (req) => {
        const { id } = req.params;
        try {
            const employee = await Employee.findOne({ where: { id }, raw: true });
            if (employee) {
                await Employee.update(req.payload, { where: { id } });
                return 'Employee updated succesfully';
            } else {
                return new Boom('Employee with such id does not exist', { statusCode: 404 });
            }
        }
        catch(err) {
            return err;
        }
    },

    destroy: async (req) => {
        const { id } = req.params;
        try {
            const employee = await Employee.findOne({ where: { id }, raw: true });
            if (employee) {
                await Employee.destroy({ where: { id } });
                return 'Employee deleted successfully';
            } else {
                return new Boom('Employee with such id does not exist', { statusCode: 404 })
            }
        }
        catch (err) {
            return err;
        }
    }
}