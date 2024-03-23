import * as controllers from '../controllers'
import  Express  from 'express';
import verifyToken from '../middlewares/verify_token';
import {isAdmin, isCreator } from '../middlewares/verify_role'
import uploadCloud from '../middlewares/uploader';
 

const router = require('express').Router();

// PUBLIC ROUTES
router.get('/', controllers.getBooks)

// PRIVATE ROUTES
router.use(verifyToken)
router.use(isCreator)
router.post('/',uploadCloud.single('image') ,controllers.createBooks)
router.put('/',uploadCloud.single('image') ,controllers.updateBook)


module.exports = router