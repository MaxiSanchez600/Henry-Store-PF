const { Router } = require('express');
const productsController = require('../controllers/products/products');
const categoriesController = require('../controllers/categories/categories');
const caracteristicsController = require('../controllers/caracteristics/caracteristics');
const subcategoriesController = require ('../controllers/subcategories/subcategories')

const router = Router();

router.get('/', productsController.getProducts);
router.post('/', productsController.setProduct);
router.put('/stock',productsController.updateStock)

router.get('/categories', categoriesController.getCategories);
router.post('/categories', categoriesController.createCategories);
router.put('/categories', categoriesController.updateCategories);
router.delete('/categories', categoriesController.deleteCategories);

router.get('/caracteristics', caracteristicsController.getCaracteristics);

router.post('/subcategories',subcategoriesController.createSubCategories);
router.put('/subcategories',subcategoriesController.updateSubCategories);
router.delete('/subcategories',subcategoriesController.deleteSubCategories);

module.exports = router;