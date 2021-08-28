const { Category, Post } = require("../models");

module.exports = {
  create: async (req, res, next) => {
    const { thumbnailUrl, title, description } = req.body;

    try {
      const c = await Category.create({
        thumbnailUrl,
        title,
        description
      });

      res.json(c);
    } catch (error) {
      next(error);
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll();

      res.json(categories);
    } catch (error) {
      next(error);
    }
  },
  getRelatedPosts: async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const p = await Post.findAll({
        where: {
          CategoryId: categoryId 
        }
      });

      res.json(p);
    } catch (error) {
      next(error);
    }
  }
}