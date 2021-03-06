const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    console.log("signup");
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try {
      const hashedPw = await bcrypt.hash(password, 12);
  
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      const result = await user.save();
      res.status(201).json({ message: 'User created!', userId: result._id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      
      next(err);
    }
  };
  exports.login = async (req, res, next) => {
    console.log("inside login");
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
      
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
        res.alert('A user with this email could not be found');
      }
      loadedUser = user;
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      // req.session.isL=true;
      // res.setHeader('Set-Cookie','logIn=true;');
      const token = jwt.sign(
        {
          name:loadedUser.name,
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token,name:loadedUser.name, userId: loadedUser._id.toString() });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  
  // exports.getUserStatus = async (req, res, next) => {
  //   try {
  //     const user = await User.findById(req.userId);
  //     if (!user) {
  //       const error = new Error('User not found.');
  //       error.statusCode = 404;
  //       throw error;
  //     }
  //     res.status(200).json({ status: user.msg });
  //   } catch (err) {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   }
  // };
  
