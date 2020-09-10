var express = require("express");
var fs = require('fs');
var path = require("path");
var cors=require('cors');
const session=require('express-session');

var bodyParser = require('body-parser');
const Chat = require('./models/message');

var chat = require("./routes/chat");
const authRoutes = require('./routes/auth');

var app = express();
var router = express.Router();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
// app.use(
//   session(
//     {secret:'mySecret', resave:false,saveUninitialized:false}
//     ));
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');


  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});




app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});



app.use("/", chat);
app.use('/auth', authRoutes);
app.use(cors);



const mongoose = require("mongoose");
let port= process.env.PORT || 8080;


 mongoose.Promise = global.Promise;
 let con=mongoose.connect("mongodb+srv://sd949:sd949@swd-j8qfx.mongodb.net/chat?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  con.then(() => {
  console.log('Connected to MongoDB!!');
    const server = app.listen(port);
    const io = require('./socket').init(server);
    io.on('connection',function(socket){
      console.log("User connected");

   socket.on('disconnect',function(socket){
       console.log("user disconnected")
   })
//     //join room
   socket.on('join',function(data){
     console.log(data.user);
     socket.join();
    console.log(data.user + ' joined the chat' );

       //inform other on the room about event
        socket.broadcast.emit('new user joined',{user:data.user,message:"has joined this room "});

      

     
      });
     //leave room

    socket.on('leave',function(data){
      

       console.log(data.user + "has left the room " +data.room)
        socket.broadcast.emit('left room',{user:data.user,message:"has left the room "});
       socket.leave(data.room)
        
    })
    
    //sending message
     socket.on('message',function(data){
      //  console.log(data.message);

     
      socket.emit('new message',{user:data.user,message:data.message});
        con.then(db => {
          console.log("connected correctly to the server");
          let chatMessage = new Chat({ content:data.message , creator: data.user });
    
          chatMessage.save();
        });
        socket.broadcast.emit('new message',{user:data.user,message:data.message});
     })

    
 });
  })
  .catch((err) => console.log(err));


module.exports = app


