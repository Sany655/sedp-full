'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('CampaignMilestones', 'deadline');
        await queryInterface.addColumn('CampaignMilestones', 'startDate', {
            type: Sequelize.DATE,
            allowNull: true,
        });
        await queryInterface.addColumn('CampaignMilestones', 'endDate', {
            type: Sequelize.DATE,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('CampaignMilestones', 'startDate');
        await queryInterface.removeColumn('CampaignMilestones', 'endDate');
        await queryInterface.addColumn('CampaignMilestones', 'deadline', {
            type: Sequelize.DATE,
            allowNull: true,
        });
    }
};
