'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExperienceBooking extends Model {
    static associate(models) {
      ExperienceBooking.belongsTo(models.Experience, {
        foreignKey: 'experienceId',
        as: 'experience'
      });
      ExperienceBooking.belongsTo(models.PassCard, {
        foreignKey: 'passCardId',
        as: 'passCard'
      });
    }
  }

  ExperienceBooking.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    experienceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Experiences',
        key: 'id'
      }
    },
    passCardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'PassCards',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'ExperienceBooking',
    hooks: {
      afterCreate: async (booking) => {
        const experience = await booking.getExperience();
        await experience.decrement('availableSpots');
      },
      afterUpdate: async (booking) => {
        if (booking.changed('status')) {
          const experience = await booking.getExperience();
          if (booking.status === 'cancelled') {
            await experience.increment('availableSpots');
          }
        }
      }
    }
  });

  return ExperienceBooking;
};