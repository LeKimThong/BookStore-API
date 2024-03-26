import * as controllers from '../controllers'
import  Express  from 'express';
import verifyToken from '../middlewares/verify_token';
const router = require('express').Router();

router.post('/register',controllers.register)
router.post('/login',controllers.login)
router.post('/refresh-token',controllers.refreshToken)
module.exports = router