const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const User = require('./user');
const Like = require('./like');
const Record = require('./record');
const Post = require('./post');
const Comment = require('./comment');
const Category = require('./category');
const Question = require('./question');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Like = Like;
db.Record = Record;
db.Post = Post;
db.Comment = Comment;
db.Category = Category;
db.Question = Question;

User.init(sequelize);
Like.init(sequelize);
Record.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Category.init(sequelize);
Question.init(sequelize);

User.associate(db);
Like.associate(db);
Record.associate(db);
Post.associate(db);
Comment.associate(db);
Category.associate(db);
Question.associate(db);

module.exports = db;