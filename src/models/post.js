const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      status: { 
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    db.Post.hasMany(db.Like);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Record);
    db.Post.belongsTo(db.Category);
  }
}