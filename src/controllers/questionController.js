const Sequelize = require('sequelize');

const {Question, Post, User} = require("../models");

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
    const { questionId } = req.params;

    try {
      const question = await Question.findOne({
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