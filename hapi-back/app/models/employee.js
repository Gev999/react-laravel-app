'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
    tableName: 'employees',
    timestamps: true,
    underscored: true
  });
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};