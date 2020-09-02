var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var userSchema = new Schema({

    name:{
        type:String,
        required:true
    },

  email:{
        type:String,
        required:true
    },
  password:{
        
     type:String,
     required:true

    },
    msg: {
        type: String,
        default: ''
      },
    messages: [
        {
          type: Schema.Types.ObjectId,
          ref: 'messages'
        }
      ]

}); 
module.exports = mongoose.model('User',userSchema);
