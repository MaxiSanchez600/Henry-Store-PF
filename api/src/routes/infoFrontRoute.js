const { Router } = require('express');
const { getDocumentTypes, getNacionalities } = require('../controllers/getterInfoToFront.js');

const router = Router();

router.get('/documenttypes',getDocumentTypes);
router.get('/nacionalities',getNacionalities);

module.exports = router;