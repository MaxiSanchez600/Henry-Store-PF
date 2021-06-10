const { Router } = require('express');
const { postUser } = require ('../controllers/registerController.js')
const { getUserInfo, putUserInfo} = require ('../controllers/loginController.js')

const router = Router();

router.post('/register',postUser)
router.get('/login',getUserInfo)
router.put('/login',putUserInfo)