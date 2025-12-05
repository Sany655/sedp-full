'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass1 = await bcrypt.hash('super_123_admin', salt);
    const hashedPass2 = await bcrypt.hash('123456', salt);

    const generateEmployeeId = () => {
      const randomNum = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
      return `EMP${randomNum}`;
    };

    await queryInterface.bulkInsert('users', [
      {
        name: 'Super Admin',
        employee_id: generateEmployeeId(),
        email: 'super_admin@gmail.com',
        password: hashedPass1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Admin',
        employee_id: generateEmployeeId(),
        email: 'admin@gmail.com',
        password: hashedPass2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
