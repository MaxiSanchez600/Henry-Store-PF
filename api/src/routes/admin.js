const { Router } = require('express');
const {banUser} = require ('../controllers/admin/adminController.js')
const router = Router();

router.post('/banuser',banUser)
// router.post('/changeemail',banUser)
// router.post('/resetpassword',banUser)
//no se deletea el user, se le cambia el estado a deshabilitado o baneado segun la fuente del cambio

module.exports = router;