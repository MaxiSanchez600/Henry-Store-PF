const { Router } = require('express');
const productController = require('../controllers/products');

const router = Router();

router.get('/', productController.getAll);

module.exports = router;