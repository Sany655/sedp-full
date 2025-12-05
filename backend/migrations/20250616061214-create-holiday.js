'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('holidays', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('government', 'religious', 'company','team_specific','location_specific', 'area_specific','territory_specific'),
        allowNull: false,
        defaultValue: 'company'
      },
      scope: {
        type: Sequelize.ENUM('global','team','location', 'area','territory', 'user_specific'),
        allowNull: false,
        defaultValue: 'global'
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      territory_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_recurring: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_by: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('holidays');
  }
};