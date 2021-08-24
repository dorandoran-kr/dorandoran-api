const Sequelize = require('sequelize');

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      audioUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Record',
      tableName: 'records',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
    db.Record.belongsTo(db.User);
    db.Record.belongsTo(db.Post);
  }
}