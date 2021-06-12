const { Router } = require('express');
// Importar todos los routers;
const authRoute = require('./auth.js');
const infoFrontRoute = require('./infoFrontRoute.js');

const router = Router();

router.use('/auth',authRoute)
router.use('/infofront',infoFrontRoute)

module.exports = router;
