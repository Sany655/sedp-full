'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VolunteerTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VolunteerTeam.hasMany(models.VolunteerTeamMember, {
        foreignKey: "volunteer_team_id",
        as: "members"
      });
    }
  }
  VolunteerTeam.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    leader_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'VolunteerTeam',
    tableName: 'volunteer_teams'
  });
  return VolunteerTeam;
};