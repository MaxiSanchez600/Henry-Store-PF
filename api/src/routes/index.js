const { Router } = require('express');
const authRoute = require('./auth.js');
const productRouter = require('./product');
const userRoute = require ('./userFlow.js');

// Importar todos los routers;
const router = Router();

// Configurar los routers
router.use('/product', productRouter);
router.use('/auth', authRoute)
router.use('/userflow',userRoute)

module.exports = router;