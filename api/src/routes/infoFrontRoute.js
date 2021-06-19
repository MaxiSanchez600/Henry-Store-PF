const { Router } = require('express');
const { getDocumentTypes, getNacionalities, getCategories, getCaracteristic } = require('../controllers/getterInfoToFront.js');

const router = Router();

router.get('/documenttypes',getDocumentTypes);
router.get('/nacionalities',getNacionalities);
router.get('/categories', getCategories);
router.get('/caracteristics', getCaracteristic);

module.exports = router;