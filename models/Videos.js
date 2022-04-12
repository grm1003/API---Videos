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

likes :{
    type: Number,
   
},

});

module.exports = mongoose.model("Video", videoSchema);