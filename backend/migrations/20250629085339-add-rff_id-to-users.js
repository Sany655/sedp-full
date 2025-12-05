'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('users', 'rff_point_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Add indexes for better performance
    await queryInterface.addIndex('users', ['rff_point_id'], {
      name: 'idx_users_rff_point_id'
    });

  },

  async down(queryInterface, Sequelize) {
    // Remove indexes
    await queryInterface.removeIndex('users', 'idx_users_rff_point_id');

    // Remove columns
    await queryInterface.removeColumn('users', 'rff_point_id');

  }
};