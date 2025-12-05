'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('rff_points', 'isActive', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove columns
    await queryInterface.removeColumn('rff_points', 'isActive');

  }
};