'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_documents', {
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
      
      // Profile and basic documents
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Profile image file path'
      },
      cv: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'CV/Resume file path'
      },
      
      // Official documents
      nid: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'National ID document file path'
      },
      passport: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Passport document file path'
      },
      driving_license: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Driving license file path'
      },
      birth_certificate: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Birth certificate file path'
      },
      
      // Work-related documents
      job_clearance: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Job clearance certificate file path'
      },
      experience_certificate: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Experience certificate file path'
      },
      salary_certificate: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Previous salary certificate file path'
      },
      
      // Educational documents
      educational_docs: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Educational certificates file path'
      },
      degree_certificate: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Degree certificate file path'
      },
      transcript: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Academic transcript file path'
      },
      
      // Guarantor and family documents
      guarantor_docs: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Guarantor documents file path'
      },
      guarantor_nid: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Guarantor NID file path'
      },
      parents_nid: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Parents NID documents file path'
      },
      spouse_nid: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Spouse NID file path'
      },
      
      // Medical documents
      medical_certificate: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Medical fitness certificate file path'
      },
      vaccination_certificate: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Vaccination certificate file path'
      },
      
      // Banking documents
      bank_statement: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Bank statement file path'
      },
      cheque_leaf: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Bank cheque leaf file path'
      },
      
      // Document verification status
      verification_status: {
        type: Sequelize.ENUM('pending', 'verified', 'rejected', 'incomplete'),
        defaultValue: 'pending',
        allowNull: false,
      },
      verified_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      verification_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Notes from document verification'
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
    await queryInterface.addIndex('user_documents', ['user_id'], {
      name: 'idx_user_documents_user_id',
      unique: true
    });

    await queryInterface.addIndex('user_documents', ['verification_status'], {
      name: 'idx_user_documents_verification_status'
    });

    await queryInterface.addIndex('user_documents', ['verified_by'], {
      name: 'idx_user_documents_verified_by'
    });

    await queryInterface.addIndex('user_documents', ['verified_at'], {
      name: 'idx_user_documents_verified_at'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_documents');
  }
};