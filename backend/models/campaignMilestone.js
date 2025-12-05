'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CampaignMilestone extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CampaignMilestone.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            CampaignMilestone.hasMany(models.CampaignMilestoneType, { foreignKey: 'campaign_milestone_id', as: 'milestoneTypes' });
        }
    }
    CampaignMilestone.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'CampaignMilestone',
    });
    return CampaignMilestone;
};
