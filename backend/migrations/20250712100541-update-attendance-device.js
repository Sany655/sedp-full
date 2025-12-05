'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('attendance_devices', 'last_ping', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('attendance_devices', 'mac_address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('attendance_devices', 'territory_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('attendance_devices', 'rff_point_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  
  },

  async down(queryInterface, Sequelize) {
    // Remove columns
    await queryInterface.removeColumn('attendance_devices', 'last_ping');
    await queryInterface.removeColumn('attendance_devices', 'mac_address');
    await queryInterface.removeColumn('attendance_devices', 'territory_id');
    await queryInterface.removeColumn('attendance_devices', 'rff_point_id');
  }
};