'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('attendances', 'location', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.addColumn('attendances', 'remarks', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove columns
    await queryInterface.removeColumn('attendances', 'location');
    await queryInterface.removeColumn('attendances', 'remarks');

  }
};