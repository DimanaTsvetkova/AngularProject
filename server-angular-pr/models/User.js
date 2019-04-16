const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  imageUrl: {
    type: mongoose.Schema.Types.String,
    default:'../images/alt-user.jpg'
  },
  salt: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  roles: [{
    type: mongoose.Schema.Types.String
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  userPosts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }]
});

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPassword;
  }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, 'Admin');
    return User.create({
      username: 'Admin',
      imageUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      salt,
      hashedPassword,
      roles: ['Admin'],
      
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = User;
