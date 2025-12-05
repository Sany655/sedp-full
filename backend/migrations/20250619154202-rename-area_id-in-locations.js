'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('locations', 'area_id', 'team_id');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('locations', 'team_id', 'area_id');
  }
};
