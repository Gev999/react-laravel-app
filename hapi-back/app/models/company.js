'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    logo: DataTypes.STRING,
    website: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
    tableName: 'companies',
    timestamps: true,
    underscored: true
  });
  Company.associate = function(models) {
    // associations can be defined here
  };
  return Company;
};