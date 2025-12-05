'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('rff_points', 'start_date', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn('rff_points', 'start_date', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
