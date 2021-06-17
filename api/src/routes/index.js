const { Router } = require('express');
const authRoute = require('./auth.js');
const infoFrontRoute = require('./infoFrontRoute.js');
const productRouter = require('./product');

// Importar todos los routers;
const router = Router();

// Configurar los routers
router.use('/product', productRouter);
router.use('/auth', authRoute)

module.exports = router;