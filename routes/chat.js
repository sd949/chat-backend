var express = require('express');

const feedController = require('../controllers/chat');


 const Chat=require('../models/message');



var router = express.Router();

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

router.get('/chat', (req, res) => {
    console.log(" hi chat");
    var message = Chat.find((err, mess)=>{
             if (err){
               console.log(err);
              }
              else{
                  //  console.log(mess);
              
                 res.json(mess);
              }
           
          } );
        
       });

module.exports = router;