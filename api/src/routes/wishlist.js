const { Router } = require('express');
const wishlistController = require('../controllers/wishlist/wishlist');

const router = Router();

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addWishlist);
router.delete('/', wishlistController.deleteWishlist);

module.exports = router;