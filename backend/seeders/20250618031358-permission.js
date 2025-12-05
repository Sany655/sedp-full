'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Define permissions to be created
    const permissions = [
      'view-users',
        'add-users',
        'edit-users',
        'delete-users',
        'view-dashboard',
        'view-attendance-reports',
        'create-roles',
        'edit-roles',
        'create-permissions',
        'edit-permissions',
        'delete-permissions',
        'view-permissions',
        'delete-roles',
        'mark-attendance',
        'view-areas',
        'add-areas',
        'edit-areas',
        'delete-areas',
        'view-regions',
        'add-regions',
        'edit-regions',
        'delete-regions',
        'view-permissions',
        'view-user-details',
        'view-holidays',
        'set-holidays',
        'view-policies',
        'view-rffs',
        'view-rffs',
        'delete-rffs',
        'assign-policy',
        'view-teams',
        'edit-teams',
        'delete-teams',
        'view-territories',
        'edit-territories',
        'delete-territories',
        'view-roles',
    ];

    // Insert permissions into the `permissions` table
    const createdPermissions = await queryInterface.bulkInsert(
      'permissions',
      permissions.map(name => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      { returning: true }
    );

    // Fetch inserted permissions
    const insertedPermissions = await queryInterface.sequelize.query(
      `SELECT id FROM permissions WHERE name IN (${permissions.map(p => `'${p}'`).join(',')});`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Assign all permissions to role_id = 1 (admin)
    const rolePermissions = insertedPermissions.map(p => ({
      role_id: 1,
      permission_id: p.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('role_permissions', rolePermissions);
  },

  async down(queryInterface, Sequelize) {
    // Delete the permissions you created
    await queryInterface.bulkDelete('permissions', {
      name: [
        'view-users',
        'add-users',
        'edit-users',
        'delete-users',
        'view-dashboard',
        'view-attendance-reports',
        'create-roles',
        'edit-roles',
        'create-permissions',
        'edit-permissions',
        'delete-permissions',
        'view-permissions',
        'delete-roles',
        'mark-attendance',
        'view-areas',
        'add-areas',
        'edit-areas',
        'delete-areas',
        'view-regions',
        'add-regions',
        'edit-regions',
        'delete-regions',
        'view-permissions',
        'view-user-details',
        'view-holidays',
        'set-holidays',
        'view-policies',
        'view-rffs',
        'view-rffs',
        'delete-rffs',
        'assign-policy',
        'view-teams',
        'edit-teams',
        'delete-teams',
        'view-territories',
        'edit-territories',
        'delete-territories',
        'view-roles',
        
      ]
    });

    // You may also clear role_permissions mapping if needed
    await queryInterface.bulkDelete('role_permissions', {
      role_id: 1
    });
  }
};
