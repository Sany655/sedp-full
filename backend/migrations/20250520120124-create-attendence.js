'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      company_attendence_policy_id: {
        type: Sequelize.INTEGER
      },
      clock_in: {
        type: Sequelize.DATE
      },
      clock_out: {
        type: Sequelize.DATE
      },
      isManual: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isAbsent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isLate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      overtime_in_min: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('attendances');
  }
};