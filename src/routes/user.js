import * as controllers from '../controllers'
import  Express  from 'express';
import verifyToken from '../middlewares/verify_token';
import { isAdmin, isModerator } from '../middlewares/verify_role';

const router = require('express').Router();

// PUBLIC ROUTES

// PRIVATE ROUTES
router.use(verifyToken)
// router.use(isAdmin)
router.get('/',controllers.getCurrently)

module.exports = router