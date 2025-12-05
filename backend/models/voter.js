'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here if needed
      // Example: Voter.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    }
  }
  
  Voter.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: false
    },
    nid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Location information stored as JSON
    division: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Stores division id and name as {id, name}'
    },
    district: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Stores district id and name as {id, name}'
    },
    upazilla: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Stores upazilla id and name as {id, name}'
    },
    union: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Stores union id and name as {id, name}'
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false
    },
    voter_center: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Voter',
    tableName: 'voters',
    timestamps: true,
    underscored: true
  });
  
  return Voter;
};
