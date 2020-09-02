var express = require('express');
// const { body } = require('express-validator/check');
const feedController = require('../controllers/chat');
// const isAuth = require('../middleware/is-auth');
// const User = require('../models/user');
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
                   console.log(mess);
              
                 res.json(mess);
              }
           
          } );
        
       });
// var cors=require("cors");
// server.listen(4000,function(req,res){

//     console.log("You are listening to port 4000");
//  });

// GET /feed/posts
// router.get('/chat', isAuth, feedController.getPosts);

// router.post(
//     '/chat',
//     isAuth,
//     [
//       body('content')
//         .trim()
//         .isLength({ min: 0 })
//     ],
//     feedController.createPost
//   );











// io.origins('*:*');


// io.on('connection',function(socket){
//       console.log("User connected");

//    socket.on('disconnect',function(socket){
//        console.log("user disconnected")
//    })
// //     //join room
//    socket.on('join',function(data){
//      socket.join()
//     console.log(user.name + 'joined the chat' )

// //        //inform other on the room about event
//         socket.broadcast.emit('new user joined',{user:data.user,message:"has joined this room "});
      

//      });
//      //leave room

//     socket.on('leave',function(data){
      

//        console.log(data.user + "has left the room " +data.room)
//         socket.broadcast.emit('left room',{user:data.user,message:"has left the room "});
//        socket.leave(data.room)
        
//     })

// //     //sending message
//      socket.on('message',function(data){

     
//         socket.broadcast.emit('new message',{user:data.user,message:data.message});
//         connect.then(db => {
//           console.log("connected correctly to the server");
//           let chatMessage = new Chat({ content: msg, creator: "Anonymous" });
    
//           chatMessage.save();
//         });
//      })

    
//  })

module.exports = router;