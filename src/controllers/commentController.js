const { Comment } = require("../models");

module.exports = {
  cretate: async (req, res, next) => {
    const user = req.user;
    const { postId } = req.params;
    const { text } = req.body;

    try {
      const c = await Comment.create({
        text,
        PostId: postId,
        UserId: user.id
      });

      res.json(c);
    } catch (error) {
      next(error);
    }
  }
}