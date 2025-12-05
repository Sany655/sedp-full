'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendance_policies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: 'default'
      },
      working_days:{
        type:Sequelize.JSON
      },
      off_days:{
        type:Sequelize.JSON
      },
      work_start_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      work_end_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      late_grace_period: {
        type: Sequelize.INTEGER
      },
      overtime_threshold: {
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
    await queryInterface.dropTable('attendance_policies');
  }
};