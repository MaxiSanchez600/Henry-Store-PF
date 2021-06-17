const { Router } = require('express');
const authRoute = require('./auth.js');
const productsRouter = require('./products');
const userRoute = require ('./userFlow.js');

// Importar todos los routers;
const router = Router();

// Configurar los routers
router.use('/products', productsRouter);
router.use('/auth', authRoute)
router.use('/userflow',userRoute)

module.exports = router;