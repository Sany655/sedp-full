'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('attendances', 'attendance_taken_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue:2
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove columns
    await queryInterface.removeColumn('attendances', 'attendance_taken_by');

  }
};