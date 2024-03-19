import * as controllers from '../controllers'
import  Express  from 'express';
import verifyToken from '../middlewares/verify_token';


const router = require('express').Router();

// PUBLIC ROUTES
router.get('/', controllers.getBooks)

// PRIVATE ROUTES
router.use(verifyToken)
// router.use(isAdmin)
router.get('/',controllers.getCurrently)

module.exports = router