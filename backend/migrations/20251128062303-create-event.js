'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type_id: {
        type: Sequelize.INTEGER,
      },
      objective: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0 // 0 = pending, 1 = ongoing, 2 = complete, 3 = canceled
      },
      visibility: {
        type: Sequelize.TINYINT,
        defaultValue: 0 // 0 = public, 1 = internal, 2 = team-oriented
      },
      target_group_id: {
        type: Sequelize.INTEGER,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      organized_by: {
        type: Sequelize.INTEGER,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      est_budget: {
        type: Sequelize.DOUBLE(10, 2),
      },
      est_spending: {
        type: Sequelize.DOUBLE(10, 2),
      },
      volunteer_team_id: {
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      division_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      district_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      thana_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ward_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      union_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true
      },
      expected_start_datetime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      expected_end_datetime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      actual_start_datetime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      actual_end_datetime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};