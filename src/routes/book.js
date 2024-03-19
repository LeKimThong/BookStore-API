import * as controllers from '../controllers'
import  Express  from 'express';
import verifyToken from '../middlewares/verify_token';
import {isAdmin } from '../middlewares/verify_role'
 

const router = require('express').Router();

// PUBLIC ROUTES
router.get('/', controllers.getBooks)

// PRIVATE ROUTES
router.use(verifyToken)
router.use(isAdmin)
router.post('/', controllers.createBooks)


module.exports = router