const { Router } = require('express');
const { createUser } = require ('../controllers/loginANDregister/registerController')
const { readUserInfo, updateUserInfo} = require ('../controllers/loginANDregister/loginController.js')

const router = Router();

router.post('/register',createUser)
router.get('/login',readUserInfo)
router.put('/login',updateUserInfo)
//no se deletea el user, se le cambia el estado a deshabilitado o baneado segun la fuente del cambio

module.exports = router;