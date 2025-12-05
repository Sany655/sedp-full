'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CampaignMilestoneTypes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            campaign_milestone_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'CampaignMilestones',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            campaign_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'CampaignTypes',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            area: {
                type: Sequelize.STRING,
                allowNull: true
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
        await queryInterface.dropTable('CampaignMilestoneTypes');
    }
};
