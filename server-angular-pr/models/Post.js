const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  imageUrl: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  likes:{
    type:mongoose.Schema.Types.Number,
    default:0
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
