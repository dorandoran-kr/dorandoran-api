const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      role: { // 0: user, 1: admin
        type: Sequelize.INTEGER(4),
        defaultValue: 0,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(300),
        allowNull: true // KAKAO의 경우 password X
      },
      nickname: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
      },
      profileUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db) {
  }
}