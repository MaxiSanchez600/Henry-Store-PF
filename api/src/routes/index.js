const { Router } = require('express');

// Importar todos los routers;
const authRoute = require('./auth.js');
const renderFrontRoute = require('./renderFrontRoute.js');
const router = Router();


router.use('/auth',authRoute)
router.use('/renderfront',renderFrontRoute)

module.exports = router;
