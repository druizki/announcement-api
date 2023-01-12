'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      label: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.TEXT
      },
      isDraft: {
        type: Sequelize.BOOLEAN
      },
      totalViews: {
        type: Sequelize.INTEGER
      },
      publishedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Notices');
  }
};