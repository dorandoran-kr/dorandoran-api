const { Post, Record, Like, User, Comment } = require("../models");

module.exports = {
  create: async (req, res, next) => {
    const user = req.user;
    const { title, description, thumbnailUrl, categoryId } = req.body;

    try {
      const p = await Post.create({
        title,
        description,
        thumbnailUrl,
        CategoryId: categoryId,
        UserId: user.id
      });

      res.json(p);
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findOne({
        where: { id },
        include: [
          { model: Record },
          { model: Like },
          { model: Comment },
          { model: User },
        ]
      });

      res.json(post);
    } catch (error) {
      next(error);
    }
  }
}