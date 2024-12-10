'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    static associate(models) {
      Experience.hasMany(models.ExperienceBooking, {
        foreignKey: 'experienceId',
        as: 'bookings'
      });
    }
  }

  Experience.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterNow(value) {
          if (new Date(value) < new Date()) {
            throw new Error('Start date must be in the future');
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterStartDate(value) {
          if (new Date(value) < new Date(this.startDate)) {
            throw new Error('End date must be after start date');
          }
        }
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    availableSpots: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    imageUrl: DataTypes.STRING,
    allowedTiers: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidTiers(value) {
          const validTiers = ['dive_plus', 'dive_ultra', 'dive_max'];
          if (!Array.isArray(value) || !value.every(tier => validTiers.includes(tier))) {
            throw new Error('Invalid tiers');
          }
        }
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'cancelled', 'completed'),
      defaultValue: 'draft'
    }
  }, {
    sequelize,
    modelName: 'Experience',
    hooks: {
      beforeCreate: (experience) => {
        if (!experience.availableSpots) {
          experience.availableSpots = experience.capacity;
        }
      }
    }
  });

  return Experience;
};