const { Router } = require('express');
const authRoute = require('./auth.js');
const infoFrontRoute = require('./infoFrontRoute.js');
const productsRouter = require('./products');

// Importar todos los routers;
const router = Router();

// Configurar los routers
router.use('/products', productsRouter);
router.use('/auth', authRoute)

router.use('/infofront',infoFrontRoute)

module.exports = router;