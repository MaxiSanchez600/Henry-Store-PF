const { Router } = require('express');
const { getDocumentTypes, getNacionalities, getCategories } = require('../controllers/getterInfoToFront.js');

const router = Router();

router.get('/documenttypes',getDocumentTypes);
router.get('/nacionalities',getNacionalities);
router.get('/categories', getCategories)

module.exports = router;