const { Router } = require('express');

// Importar todos los routers;
const authRoute = require('./auth.js');
const router = Router();



router.use('/auth',authRoute)

module.exports = router;
