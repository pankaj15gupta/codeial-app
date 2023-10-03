const Post = require('../models/post');

const createPost = async (req, res) => {
    try {
      const post = await Post.create({
        content: req.body.content,
        user: req.user._id
      });
  
      console.log('Post created successfully');
      return res.redirect('back');
    } catch (err) {
      console.log('Error in creating a post: ', err);
      return res.redirect('back');
    }
  };
  
  module.exports = {
    create: createPost
  };
  
  
  
  
  
  
  