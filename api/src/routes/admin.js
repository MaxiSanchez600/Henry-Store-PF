const { Router } = require('express');
const { banUser, resetEmailUser, resetPassUser, readUsers} = require ('../controllers/admin/adminController.js')
const router = Router();

router.get('/users',readUsers)
router.put('/banuser',banUser)
router.put('/resetemail',resetEmailUser)
router.put('/resetpassword',resetPassUser)
//no se deletea el user, se le cambia el estado a deshabilitado o baneado segun la fuente del cambio

module.exports = router;