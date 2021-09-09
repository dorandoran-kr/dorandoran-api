const { Post, Record, Like, User, Comment, Question } = require("../models");
const likeService = require("../services/likeService");

module.exports = {
  create: async (req, res, next) => {
    const user = req.user;
    const { title, description, thumbnailUrl, questionId, url } = req.body;

    try {
      const p = await Post.create({
        title,
        description,
        thumbnailUrl,
        QuestionId: questionId,
        UserId: user.id
      });

      await Record.create({
        audioUrl: url,
        PostId: p.id,
      });

      res.json(p);
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const post = await Post.findOne({
        where: { id },
        include: [
          { model: Record },
          { model: Like },
          { 
            model: Comment,
            include: [
              { model: User }
            ]
          },
          { model: User },
          { model: Question }
        ]
      });

      const like = await likeService.hasLike(user, post.id);

      const commentCount = await Comment.count({
        where: { 
          PostId: post.id
        }
      });

      const likeCount = await Like.count({
        where: {
          PostId: post.id
        }
      })

      res.json({ post, like, commentCount, likeCount });
    } catch (error) {
      next(error);
    }
  }
}