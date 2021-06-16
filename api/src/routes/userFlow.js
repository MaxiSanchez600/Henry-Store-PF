const { Router } = require('express');
const { getUsers, updateRolUser, updateStatusUser, updateStatusManyUsers } = require ('../controllers/user/user.js');
const { createUserStatus, readUserStatus, deleteUserStatus, updateUserStatus } = require ('../controllers/userStatus/userStatus.js');
const { postDocumentTypes, postNacionalities } = require ('../controllers/user/dataController.js');
const { createRole, readRole, updateRole, deleteRole } = require('../controllers/role/role.js')
const router = Router();


router.get('/users',getUsers)
router.put('/users/rol',updateRolUser)
router.put('/users/status',updateStatusUser)
router.put('/users/manystatus',updateStatusManyUsers)

router.post('/userstatus',createUserStatus);
router.get('/userstatus',readUserStatus);
router.put('/userstatus',updateUserStatus);
router.delete('/userstatus',deleteUserStatus);

router.post('/role',createRole);
router.get('/role',readRole);
router.put('/role',updateRole);
router.delete('/role',deleteRole);

router.post('/documenttypes',postDocumentTypes);
router.post('/nacionalities',postNacionalities);

module.exports = router;