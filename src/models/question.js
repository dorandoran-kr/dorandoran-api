const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      text: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Question',
      tableName: 'questions',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    db.Question.belongsTo(db.Category);
    db.Question.belongsTo(db.User);
    db.Question.hasMany(db.Post);
  }
}