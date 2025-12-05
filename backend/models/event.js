"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // User who created the event
      // Event.belongsTo(models.User, {
      //   foreignKey: "createdBy",
      //   as: "creator"
      // });

      // // Organization/team that organized the event
      // Event.belongsTo(models.VolunteerTeam, {
      //   foreignKey: "volunteer_team_id",
      //   as: "volunteer_team"
      // });

      // // Event Type
      // Event.belongsTo(models.EventType, {
      //   foreignKey: "type_id",
      //   as: "event_type"
      // });

      // // Target Group
      // Event.belongsTo(models.TargetGroup, {
      //   foreignKey: "target_group_id",
      //   as: "target_group"
      // });

      // // Location relations
      // Event.belongsTo(models.Division, { foreignKey: "division_id", as: "division" });
      // Event.belongsTo(models.District, { foreignKey: "district_id", as: "district" });
      // Event.belongsTo(models.Thana, { foreignKey: "thana_id", as: "thana" });
      // Event.belongsTo(models.Ward, { foreignKey: "ward_id", as: "ward" });
      // Event.belongsTo(models.Union, { foreignKey: "union_id", as: "union" });
    }
  }

  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      objective: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      visibility: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      target_group_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      organized_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      est_budget: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true
      },
      est_spending: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true
      },
      volunteer_team_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      division_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      thana_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ward_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      union_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      expected_start_datetime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      expected_end_datetime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      actual_start_datetime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      actual_end_datetime: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      timestamps: true,
      // paranoid: true // Optional: enables soft delete
    }
  );

  return Event;
};
