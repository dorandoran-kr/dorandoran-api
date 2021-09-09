const { Like } = require("../models")

module.exports = {
  hasLike: async (user, PostId) => {
    const exLike = await Like.findOne({
      where: {
        UserId: user.id,
        PostId
      }
    });

    return exLike ? true : false;
  } 
}