const { Router } = require('express');
const authRoute = require('./auth.js');
const cartsRoute = require('./cart')
const productRouter = require('./product');
const userRoute = require ('./userFlow.js');
const adminRoute = require ('./admin.js')
// Importar todos los routers;
const router = Router();

// Configurar los routers
router.use('/product', productRouter);
router.use('/auth', authRoute)
router.use('/cart', cartsRoute)
router.use('/userflow',userRoute)
router.use('/admin',adminRoute)

module.exports = router;