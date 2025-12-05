'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CampaignMilestoneType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CampaignMilestoneType.belongsTo(models.CampaignMilestone, { foreignKey: 'campaign_milestone_id', as: 'milestone' });
            CampaignMilestoneType.belongsTo(models.CampaignType, { foreignKey: 'campaign_type_id', as: 'type' });
        }
    }
    CampaignMilestoneType.init({
        campaign_milestone_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CampaignMilestones',
                key: 'id'
            }
        },
        campaign_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CampaignTypes',
                key: 'id'
            }
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        area: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'CampaignMilestoneType',
    });
    return CampaignMilestoneType;
};
