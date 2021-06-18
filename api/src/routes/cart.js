const { Router } = require('express');
const add = require('../controllers/cart/addProductToCart.js');
const edit = require('../controllers/cart/editProductinCart.js')
const remove = require('../controllers/cart/removeProductFromCart.js')
const removeall = require('../controllers/cart/removeAllProductFromCart.js')
const getorders = require('../controllers/cart/getorderdetails.js')
const putguest = require('../controllers/cart/addUserGuest.js')

const router = Router();

router.post('/addproducttocart', add.addProduct)
router.put('/editproductincart', edit.editProduct)
router.delete('/removeproductfromcart', remove.removeProduct)
router.delete('/removeallproductfromcart', removeall.removeAllProduct)
router.get('/getorderdetails', getorders.getDetails)
router.put('/adduserguest', putguest.addGuest)

module.exports = router;