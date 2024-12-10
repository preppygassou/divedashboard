'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Order.hasMany(models.PassCard, {
        foreignKey: 'orderId',
        as: 'passCards'
      });
    }
  }

  Order.init({
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
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    tier: {
      type: DataTypes.ENUM('basic', 'pro', 'elite'),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shippingAddress: DataTypes.JSON,
    billingAddress: DataTypes.JSON,
    paymentIntentId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
    hooks: {
      afterUpdate: async (order) => {
        // When order is completed, create a pass card
        if (order.changed('status') && order.status === 'completed') {
          const { PassCard } = require('./index');
          await PassCard.create({
            userId: order.userId,
            orderId: order.id,
            tier: order.tier,
            status: 'pending_production'
          });
        }
      }
    }
  });

  return Order;
};