'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Account.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    type: DataTypes.STRING,
    provider: DataTypes.STRING,
    providerAccountId: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    access_token: DataTypes.TEXT,
    expires_at: DataTypes.INTEGER,
    token_type: DataTypes.STRING,
    scope: DataTypes.STRING,
    id_token: DataTypes.TEXT,
    session_state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
    indexes: [
      {
        unique: true,
        fields: ['provider', 'providerAccountId']
      }
    ]
  });

  return Account;
};