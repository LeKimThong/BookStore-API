import * as controllers from '../controllers'
import  Express  from 'express';
import verifyToken from '../middlewares/verify_token';
import {isAdmin, isCreator } from '../middlewares/verify_role'
import uploadCloud from '../middlewares/uploader';
 

const router = require('express').Router();

// PUBLIC ROUTES
router.get('/', controllers.getCategory)

// PRIVATE ROUTES

router.use(verifyToken)
router.use(isCreator)
router.post('/',controllers.createCategory)
// router.put('/',uploadCloud.single('image') ,controllers.updateBook)
// router.delete('/' ,controllers.deleteBook)


module.exports = router