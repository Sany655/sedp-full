'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('users', 'department_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'team_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });


    await queryInterface.addColumn('users', 'territory_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'designation_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'joining_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });


    // Add indexes for better performance
    await queryInterface.addIndex('users', ['employee_id'], {
      name: 'idx_users_employee_id',
      unique: true
    });

    await queryInterface.addIndex('users', ['company_id'], {
      name: 'idx_users_company_id'
    });

    await queryInterface.addIndex('users', ['department_id'], {
      name: 'idx_users_department_id'
    });

    await queryInterface.addIndex('users', ['location_id'], {
      name: 'idx_users_location_id'
    });

    await queryInterface.addIndex('users', ['territory_id'], {
      name: 'idx_users_territory_id'
    });

  },

  async down(queryInterface, Sequelize) {
    // Remove indexes
    await queryInterface.removeIndex('users', 'idx_users_employee_id');
    await queryInterface.removeIndex('users', 'idx_users_department_id');
    await queryInterface.removeIndex('users', 'idx_users_company_id');
    await queryInterface.removeIndex('users', 'idx_users_location_id');
    await queryInterface.removeIndex('users', 'idx_users_territory_id');

    // Remove columns
    await queryInterface.removeColumn('users', 'department_id');
    await queryInterface.removeColumn('users', 'team_id');
    await queryInterface.removeColumn('users', 'territory_id');
    await queryInterface.removeColumn('users', 'designation_id');
    await queryInterface.removeColumn('users', 'joining_date');

  }
};