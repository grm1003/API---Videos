const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const videoSchema = new mongoose.Schema({
_id :{
    type: String,
    required: true,
},

title:{
    type: String,
    required: true,
},

url:{
    type: String,
    required: true,
},

 categoria:{
    type: mongoose.Types.ObjectId,
    ref:'Categoria',
    required: false , 
    
}, 

desc:{
    type: String,
    required: false,
},

likes :{
    type: Number,
    required: false,
},


});

module.exports = mongoose.model("Video", videoSchema);