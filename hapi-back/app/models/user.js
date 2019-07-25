'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    provider: DataTypes.STRING,
    provider_id: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};