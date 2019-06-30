const Post = require("./../models/Pots");

const liker = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  req.io.emit("liker", post);

  return res.json(post);
};

module.exports = {
  liker
};
