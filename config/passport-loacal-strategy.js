const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport 

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
  
      if (!user || user.password !== password) {
        console.log('Invalid Username/Password');
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> passport');
      return done(err);
    }
  }));





// serializinmg  the user to dexide which key is to be kept in the user 

passport.serializeUser (function(user,done){
    done (null,user.id);
});

// deserializing the user from the key  in the cookies 

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
  
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> passport');
      return done(err);
    }
  });

//   check if the user is authenticated .

passport.checkAuthentication = function(req , res , next){
    // if the user is signed in , then pass on the passport to the next  fucntion (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not sign in 
    return res.redirect('/users/log-in');

}


passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated()){
        // req.user contains the user signed in with session cookies we just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;