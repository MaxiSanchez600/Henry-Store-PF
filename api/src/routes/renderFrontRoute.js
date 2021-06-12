const { Router } = require('express');
const { getDocumentTypes, getNacionalities } = require('../controllers/getterInfoToFront.js');

const router = Router();

router.get('/identifications',getDocumentTypes);
router.get('/nacionalities',getNacionalities);

module.exports = router;