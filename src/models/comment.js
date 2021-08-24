const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
}