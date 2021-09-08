const {Question, Post} = require("../models");

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
          { model: Post }
        ]
      });
      res.json(question);
    } catch (error) {
      next(error);
    }
  }
}