const Post = require ('../models/post')


module.exports.home = function(req ,res){
   // console.log(req.cookies);
   // res.cookie('user_id' , 35);



const findPosts = () => {
   return Post.find({})
   .populate('user')
   .populate({
      path : 'comments',
      populate :{
      path : 'user'
      }
   })
   .exec(); // Convert the query into a Promise
 };
 
 findPosts()
   .then((posts) => {
     res.render('home', {
       title: 'Home',
       posts: posts
     });
   })
   .catch((err) => {
     console.error('Error:', err);
     // Handle the error as needed
   });
     
}

