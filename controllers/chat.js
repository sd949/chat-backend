// const path = require('path');

// const { validationResult } = require('express-validator/check');
// const io = require('../socket');
// const messages = require('../models/message');
// const User = require('../models/user');


// exports.getPosts = async (req, res, next) => {
//     // const currentPage = req.query.page || 1;
//     // const perPage = 100;
//     try {
//       const totalItems = await messages.find().countDocuments();
//       const message = await messages.find()
//         .skip()
//         .limit();
  
//       res.status(200).json({
//         message: 'Fetched posts successfully.',
//         posts: message,
//         totalItems: totalItems
//       });
//     } catch (err) {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     }
//   };

  // exports.createPost = async (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const error = new Error('Validation failed, entered data is incorrect.');
  //     error.statusCode = 422;
  //     throw error;
  //   }
  
  //   const content = req.body.content;
  //   const message = new messages({
     
  //     content: content,
  //     creator: req.userId
  //   });
  //   try {
  //     await message.save();
  //     const user = await User.findById(req.userId);
  //     user.messages.push(message);
  //     await user.save();
  //     // io.getIO().emit('messages',{action: 'create',message: message});
  //     // res.status(201).json({
        
  //     //   message: message,
  //     //   creator: { _id: user._id, name: user.name }
  //     // });
  //   } catch (err) {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   }
  // };