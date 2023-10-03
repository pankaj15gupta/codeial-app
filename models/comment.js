const mongoose = require('mongoose');

const commentSchema  = new  mongoose.Schema({
     content : {
        type : String,
        require : true
     },
     
        user: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
     
},{
   timestamps : true
});


const comment = mongoose.model('Comment' , commentSchema);

module.exports = comment;


