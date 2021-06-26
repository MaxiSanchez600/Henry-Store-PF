const { Router } = require('express');
const reviewsController = require('../controllers/reviews/reviews');

const router = Router();

router.get('/', reviewsController.getReviews);
router.post('/', reviewsController.addReview);

module.exports = router;