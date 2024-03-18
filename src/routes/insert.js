import * as controllers from '../controllers'
import  Express  from 'express';


const router = Express.Router();



router.get('/', controllers.insertData)

export default router