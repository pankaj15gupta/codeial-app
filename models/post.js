const mongoose = require('mongoose');
const User = require('./user');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },

    // include the array of  ids of the all the comment in this schema itself 
      comments : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
],
}
   , {
    timeseries : true


    }
);

const Post = mongoose.model('post' , postSchema);

module.exports = Post ;