const {Question} = require("../models");

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
  getQuestions: async (req, res, next) => {
    const { categoryId } = req.params;

    try {
      const questions = await Question.findAll({
        where: {
          CategoryId: categoryId
        }
      });
      const totalCount = questions.length;

      res.json({questions, totalCount});
    } catch (error) {
      next(error);
    }
  }
}