const Sequelize = require('sequelize');

const {Question, Post, User} = require("../models");
const likeService = require('../services/likeService');

module.exports = {
  create: async (req, res, next) => {
    const user = req.user;
    const { categoryId } = req.params;
    const { text } = req.body;

    try {
      const q = await Question.create({
        text,
        CategoryId: categoryId,
        UserId: user.id
      });

      res.json(q);
    } catch (error) {
      next(error);
    }
  },
  getQuestion: async (req, res, next) => {
    const user = req.user;
    const { questionId } = req.params;

    try {
      let question = await Question.findOne({
        where: {
          id: questionId
        },
        include: [
          { 
            model: Post,
            include: [
              { model: User }
            ]
          }
        ]
      });

      question.Posts = await Promise.all(question.Posts.map(async(post) => {
        let Like = await likeService.hasLike(user, post.id);

        post.dataValues.Like = Like;

        return post;
      }))
      
      res.json(question);
    } catch (error) {
      next(error);
    }
  },
  getTodayQuestion: async (req, res, next) => {
    try {
      const question = await Question.findAll({ order: Sequelize.literal('rand()'), limit: 1 })
      res.json(question);
    } catch (error) {
      next(error);
    }
  }
}