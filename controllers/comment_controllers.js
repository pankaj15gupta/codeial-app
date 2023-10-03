const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async (req, res) => {
    try {
      const post = await Post.findById(req.body.post).exec();
  
      if (!post) {
        console.log('Post not found');
        return res.redirect('/');
      }
  
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user_id
      });
  
      post.comments.push(comment);
      await post.save();
  
      return res.redirect('/');
    } catch (err) {
      console.error('Error while adding comment:', err);
      return res.redirect('/');
    }
  };
