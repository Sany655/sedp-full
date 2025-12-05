'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_personal_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },

      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: 'Date of Birth'
      },
      blood_group: {
        type: Sequelize.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
        allowNull: true,
      },
      marital_status: {
        type: Sequelize.ENUM('single', 'married', 'divorced', 'widowed'),
        allowNull: true,
      },

      identification_type: {
        type: Sequelize.ENUM('nid', 'passport', 'driving_license', 'birth_certificate'),
        allowNull: true,
      },

      identification_no: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      disability: {
        type: Sequelize.ENUM('none', 'physical', 'visual', 'hearing', 'intellectual', 'other'),
        defaultValue: 'none',
        allowNull: true,
      },

      total_experience: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        comment: '1,0.5'
      },
      
      account_type: {
        type: Sequelize.ENUM('bank', 'mfs'),
        allowNull: true,
      },

      account_no: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      rff_point: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'RFF Point code'
      },

      rff_sub_code: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'RFF Sub code'
      },

      emergency_contact_phone: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },


      present_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      permanent_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add indexes
    await queryInterface.addIndex('user_personal_details', ['user_id'], {
      name: 'idx_user_personal_user_id',
      unique: true
    });

    await queryInterface.addIndex('user_personal_details', ['identification_type', 'identification_no'], {
      name: 'idx_user_personal_identification'
    });

    await queryInterface.addIndex('user_personal_details', ['blood_group'], {
      name: 'idx_user_personal_blood_group'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_personal_details');
  }
};