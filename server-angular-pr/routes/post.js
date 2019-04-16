const router = require('express').Router();
const postController = require('../controllers/post');
const isAuth = require('../middleware/is-auth');

router.get('/all', postController.getPosts);

// router.get('/:productId',shopController.findProduct)
router.post('/create', postController.createPost );
router.get('/mine/:id', postController.getUserPosts);
router.get('/wishlist/:id', postController.getWishlist);
router.put('/all', postController.updatePost);

router.delete('/all/:id', postController.deletePost);
// router.get('/delete/:productId', shopController.getDeleteProduct);
module.exports = router;