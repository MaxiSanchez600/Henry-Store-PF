const { Router } = require('express');
const authRoute = require('./auth.js');
const infoFrontRoute = require('./infoFrontRoute.js');
const productsRouter = require('./products');
const userRoute = require ('./userFlow.js');

// Importar todos los routers;
const router = Router();

// Configurar los routers
router.use('/products', productsRouter);
router.use('/auth', authRoute)
router.use('/infofront',infoFrontRoute)
router.use('/userflow',userRoute)

module.exports = router;