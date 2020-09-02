const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageScheme= new Schema({
    creator: {
        type: String,
        
        required: true
      },
      content: {
        type: String,
        required: true
      },

},
{ timestamps: true }
);
module.exports = mongoose.model('messages', messageScheme);