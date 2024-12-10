'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PassCard extends Model {
    static associate(models) {
      PassCard.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      PassCard.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
    }

    static generateCardNumber() {
      const prefix = 'DC';
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `${prefix}${timestamp}${random}`;
    }
  }

  PassCard.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    cardNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM(
        'pending_production',
        'in_production',
        'ready_to_ship',
        'shipped',
        'delivered',
        'activated',
        'expired',
        'cancelled'
      ),
      defaultValue: 'pending_production'
    },
    tier: {
      type: DataTypes.ENUM('dive_plus', 'dive_ultra', 'dive_max'),
      allowNull: false
    },
    validFrom: DataTypes.DATE,
    validUntil: DataTypes.DATE,
    divesRemaining: DataTypes.INTEGER,
    trackingNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PassCard',
    hooks: {
      beforeCreate: async (passCard) => {
        if (!passCard.cardNumber) {
          passCard.cardNumber = PassCard.generateCardNumber();
        }
        
        // Set dives based on tier
        switch (passCard.tier) {
          case 'dive_plus':
            passCard.divesRemaining = 10;
            break;
          case 'dive_ultra':
            passCard.divesRemaining = 25;
            break;
          case 'dive_max':
            passCard.divesRemaining = null; // Unlimited dives
            break;
        }

        // Set validity period (1 year from activation)
        if (!passCard.validFrom) {
          passCard.validFrom = new Date();
          passCard.validUntil = new Date(passCard.validFrom);
          passCard.validUntil.setFullYear(passCard.validUntil.getFullYear() + 1);
        }
      }
    }
  });

  return PassCard;
};