const { Like } = require("../models");

module.exports = {
  like: async (req, res, next) => {
    try {
      const user = req.user;
      const { postId } = req.params;

      const like = await Like.findOrCreate({
        where: { 
          UserId: user.id,
          PostId: postId
        },
        defaults: {
          UserId: user.id,
          PostId: postId
        }
      });

      const likeCount = await Like.count({
        where: {
          PostId: postId
        }
      })

      res.json({ like, likeCount });
    } catch (error) {
      next(error);
    }
  },

  unlike: async (req, res, next) => {
    try {
      const user = req.user;
      const { postId } = req.params;

      const l = await Like.destroy({
        where: {
          UserId: user.id,
          PostId: postId
        }
      });

      res.json(l);
    } catch (error) {
      next(error);
    }
  }
}