const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');

// used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-loacal-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddileware = require ('node-sass-middleware');


app.use(sassMiddileware({
    src : './assets/scss',
    dest: './assets/css',
    debug : true , 
    outputStyle : 'extended ',
    prefix : '/css'


}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

// extracts style and script from sub pages into the layouts

app.set('layout extractStyles', true);
app.set('layout extractScripts' , true);







// set up the  view engine

app.set('view engine' , 'ejs');
app.set('views' , './views');
app.set('profile','./views' )

// mongo store is used to  store the session cookie in the db 


app.use(session({
    name: 'codeial',
    // TODO Change the secret before deployment in production mode 
    secret: 'something',
    saveUninitialized: false, // Corrected the typo here
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb set up ok')
    })
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);


// use express routes

app.use('/', require('./routes'));



app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server  , ${err}`);
    }

    console.log(`Server is running on port : ${port}`);

})