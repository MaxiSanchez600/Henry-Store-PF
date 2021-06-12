const { Router } = require('express');
const productsRouter = require('./products');

// Importar todos los routers;
const authRoute = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/auth', authRoute)

module.exports = router;
