const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  getPosts: (req, res) => {
    Post.find()
      .populate('creator', 'imageUrl')
      .then((posts) => {
        res
          .status(200)
          .json({ message: 'Fetched posts successfully.', posts });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

      });
  },
  // findProduct:(req,res)=>{
  //   let productId = req.params.productId;
  //   Product.findById(productId)
  //   .then(product=>{
  //     res
  //         .status(200)
  //         .json({ message: 'Product Found.', product });
  //   }).catch((error) => {
  //     if (!error.statusCode) {
  //       error.statusCode = 500;
  //     }

  //   });
  // },
  createPost: (req, res) => {
    const id = req.body.creator;
    const postObj = req.body;

    Promise.all([Post.create(postObj), User.findById(id)])
      .then(([post, user]) => {
        user.userPosts.push(post);
        res.status(200)
          .json({
            message: 'Post created successfully!',

          })


        return User.findByIdAndUpdate(id, user);
      }).then((res) => {

      }).catch(e => console.error(e));
  },

  getUserPosts: (req, res) => {
    // const id = req.body.id;
    // console.log(id)
    const userId = req.params.id;
    console.log(userId)
    User.findById(userId)
      .populate({
        path: 'userPosts',
        model: 'Post'
      }).then((user) => {
        console.log(user)
        res.status(200)
          .json({ message: 'Fetched current user posts!', user });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

      });
  },

  // getDeletePost: (req, res, next) => {
  //   const {id} = req.params;

  //   Post.findById(id)
  //     .then((post) => {
  //       res
  //         .status(200)
  //         .json({ message: 'Fetched delete page.', post })
  //     })
  //     .catch((error) => {
  //       if (!error.statusCode) {
  //         error.statusCode = 500;
  //       }
  //       next(error);
  //     });
  // },
  // 2te в едно
  updatePost: (req, res) => {
    const {postId, userId} = req.body;

    Promise.all([Post.findById(postId), User.findById(userId)])
    .then(([post, user])=>{
        console.log('here')
        user.wishlist.push(post._id)
            post.likes += 1;
          user.save()
          post.save()

    }).then(post => {
      // console.log(post)
      res.
        status(200)
        .json({ message: "Destination added to wishlist!", post })
    }).catch((err)=>{
      console.log(err)
    })


    // Post.findById(postId)
    // .then((post) => {
        
    //       User.findById(userId).then((user)=>{
    //         if(user.wishlist.includes(postId)){
    //         user.wishlist.unshift(post._id)
    //         post.likes += 1;
    //       return user.save()
    //         }else{
    //           user.wishlist.filter(post=>{
    //             post!=postId
    //           })
    //           return user.save()
    //         }
    //     }).then(user=>{
    //       console.log(user)
    //     })
    //     return post.save()
      
    // }).then(post => {
    //   res.
    //     status(200)
    //     .json({ message: "Destination updated", post })
    // })
      

  },


 getWishlist:(req, res)=>{
  const userId = req.params.id;
  console.log(userId)
  User.findById(userId)
    .populate({
      path: 'wishlist',
      model: 'Post'
    }).then((user) => {
      console.log(user)
      res.status(200)
        .json({ message: 'Fetched wishlist!', user });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }

    });
 },

  // Пробвай

  deletePost: (req, res) => {
    console.log(req.params)

    const { id } = req.params
    
    Post.findByIdAndDelete(id).then((err,data)=>{
      if(err){
        console.log(err)
      }else{
        console.log('Post deleted succesfully')
      }
    }).catch(err=>{
      console.log(err)
    })


  }

}

