const { Router } = require('express');
const productsController = require('../controllers/products/products');
const categoriesController = require('../controllers/categories/categories');
const caracteristicsController = require('../controllers/caracteristics/caracteristics');

const router = Router();

router.get('/', productsController.getProducts);
router.post('/', productsController.setProduct);

router.get('/categories', categoriesController.getCategories)

router.get('/caracteristics', caracteristicsController.getCaracteristics);

module.exports = router;