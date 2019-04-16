const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');

function validateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });
    return false;
  }

  return true;
}

module.exports = {
  signUp: (req, res, next) => {

    if (validateUser(req, res)) {
      let { password, username, imageUrl } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);
      if (imageUrl.length < 7) {
        imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      }

          User.create({
            username,
            hashedPassword,
            imageUrl,
            salt
          }).then((user) => {
            res.status(201)
              .json({
                message: 'User created!',
                user: {
                  username,
                  userId: user._id.toString(),
                  imageUrl: user.imageUrl
                }
              })
          })
            .catch((error) => {
              if (!error.statusCode) {
                error.statusCode = 500;
              }

              next(error);
            });
        }
  }
  ,
  signIn: (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const error = new Error('A user with this username could not be found');
          error.statusCode = 401;
          throw error;
        }

        if (!user.authenticate(password)) {
          const error = new Error('Incorrect creditentials!');
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({
          username: user.username,
          userId: user._id.toString()
        }
          , 'somesupersecret'
          , { expiresIn: '1h' });

        res.status(200).json(
          {
            message: 'User successfully logged in!',
            token,
            user: {
              username: user.username,
              userId: user._id,
              imageUrl: user.imageUrl
            },
            isAdmin: user.roles.indexOf('Admin') != -1
          });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  }
};