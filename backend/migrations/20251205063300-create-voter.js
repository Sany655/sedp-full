'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: false
      },

      nid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },

      profession: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // JSON location objects
      division: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: 'Stores division id and name as {id, name}'
      },

      district: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: 'Stores district id and name as {id, name}'
      },

      upazilla: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: 'Stores upazilla id and name as {id, name}'
      },

      union: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: 'Stores union id and name as {id, name}'
      },

      ward: {
        type: Sequelize.STRING,
        allowNull: false
      },

      voter_center: {
        type: Sequelize.STRING,
        allowNull: false
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // -------------------------------
    // GENERATED COLUMNS FOR JSON INDEXING
    // -------------------------------

    // Division ID
    await queryInterface.sequelize.query(`
      ALTER TABLE voters
      ADD COLUMN division_id INT
      GENERATED ALWAYS AS (CAST(JSON_UNQUOTE(JSON_EXTRACT(division, '$.id')) AS UNSIGNED)) STORED;
    `);

    // District ID
    await queryInterface.sequelize.query(`
      ALTER TABLE voters
      ADD COLUMN district_id INT
      GENERATED ALWAYS AS (CAST(JSON_UNQUOTE(JSON_EXTRACT(district, '$.id')) AS UNSIGNED)) STORED;
    `);

    // Upazilla ID
    await queryInterface.sequelize.query(`
      ALTER TABLE voters
      ADD COLUMN upazilla_id INT
      GENERATED ALWAYS AS (CAST(JSON_UNQUOTE(JSON_EXTRACT(upazilla, '$.id')) AS UNSIGNED)) STORED;
    `);

    // Union ID
    await queryInterface.sequelize.query(`
      ALTER TABLE voters
      ADD COLUMN union_id INT
      GENERATED ALWAYS AS (CAST(JSON_UNQUOTE(JSON_EXTRACT(\`union\`, '$.id')) AS UNSIGNED)) STORED;
    `);

    // ---------------------------------
    // Add indexes on generated columns
    // ---------------------------------

    await queryInterface.addIndex('voters', ['division_id'], {
      name: 'voters_division_id_index'
    });

    await queryInterface.addIndex('voters', ['district_id'], {
      name: 'voters_district_id_index'
    });

    await queryInterface.addIndex('voters', ['upazilla_id'], {
      name: 'voters_upazilla_id_index'
    });

    await queryInterface.addIndex('voters', ['union_id'], {
      name: 'voters_union_id_index'
    });

    // NID index
    await queryInterface.addIndex('voters', ['nid'], {
      name: 'voters_nid_index',
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('voters');
  }
};