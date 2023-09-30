const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('Profile',{
     title : 'Profile'
    })
}


// render the sign up page 
module.exports.signUp = function(req , res){
  if(req.isAuthenticated()){
    return  res.redirect('/users/profile')
  }
   

    return res.render('User_sign_up' , {
        title : "Codeial | Sign Up"
    })
}


// render the log in page

module.exports.LogIn = function(req , res){

  if(req.isAuthenticated()){
     return  res.redirect('/users/profile')
   }
    return res.render('User_log_in' , {
        title : "Codeial | Log In "
    })
}

// GET THE sign up DATA
module.exports.create = function(req , res){
 if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
 }

 User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return User.create(req.body);
    }
    return Promise.resolve(user);
  })
  .then(createdUser => {
    return res.redirect('/users/log-in');
  })
  .catch(err => {
    console.error('Error:', err);
    return res.redirect('back');
  });



}


// SIGN IN AND CREATE A SESSION FOR THE USER 


module.exports.createSession = function(req , res){
     return res.redirect('/');

    }


    module.exports.destroySession = function (req, res) {
      req.logout(function (err) {
        if (err) {
          // Handle any errors that occur during logout
          console.error(err);
        }
        return res.redirect('/');
      });
    };
    