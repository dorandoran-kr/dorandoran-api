const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      thumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Category',
      tableName: 'categories',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    db.Category.hasMany(db.Post);
  }
}