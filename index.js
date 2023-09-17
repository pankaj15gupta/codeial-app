const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 8000;


app.use(express.static('./assets'));
app.use(expressLayouts);

// extracts style and script from sub pages into the layouts

app.set('layout extractStyles', true);
app.set('layout extractScripts' , true);



// use express routes

app.use('/', require('./routes'));




// set up the  view engine

app.set('view engine' , 'ejs');
app.set('views' , './views');
app.set('profile','./views' )



app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server  , ${err}`);
    }

    console.log(`Server is running on port : ${port}`);

})