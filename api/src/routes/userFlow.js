const { Router } = require('express');
const { updateRolUser, updateStatusUser, updateStatusManyUsers, updateRoleManyUsers, updateNacionalityManyUsers, updateDocumentTypeManyUsers, getHcAmount, getUserOrders } = require ('../controllers/user/user.js');
const { createUserStatus, readUserStatus, deleteUserStatus, updateUserStatus } = require ('../controllers/userStatus/userStatus.js');
const { createDocumentTypes, readDocumentTypes, updateDocumentTypes, deleteDocumentTypes } = require ('../controllers/documentType/documentType.js');
const { createRole, readRole, updateRole, deleteRole } = require('../controllers/role/role.js')
const { createNacionalities, readNacionalities, updateNacionalities, deleteNacionalities} = require ('../controllers/nacionality/nacionality.js')
const router = Router();


router.put('/users/rol',updateRolUser)
router.put('/users/status',updateStatusUser)
router.put('/users/manystatus',updateStatusManyUsers)
router.put('/users/manyroles',updateRoleManyUsers)
router.put('/users/manynacionalities',updateNacionalityManyUsers)
router.put('/users/manydocumenttype',updateDocumentTypeManyUsers)


router.post('/userstatus',createUserStatus);
router.get('/userstatus',readUserStatus);
router.put('/userstatus',updateUserStatus);
router.delete('/userstatus',deleteUserStatus);

router.post('/role',createRole);
router.get('/role',readRole);
router.put('/role',updateRole);
router.delete('/role',deleteRole);

router.post('/nacionalities',createNacionalities);
router.get('/nacionalities',readNacionalities);
router.put('/nacionalities',updateNacionalities);
router.delete('/nacionalities',deleteNacionalities);

router.post('/documenttypes',createDocumentTypes);
router.get('/documenttypes',readDocumentTypes);
router.put('/documenttypes',updateDocumentTypes);
router.delete('/documenttypes',deleteDocumentTypes);

// router.get('/users/hcamount',getHcAmount);

router.get('/myorders', getUserOrders);

module.exports = router;