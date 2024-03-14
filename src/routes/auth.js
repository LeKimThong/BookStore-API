import * as controllers from '../controllers'
import  Express  from 'express';
const router = require('express').Router();

router.post('/register',controllers.register)

module.exports = router