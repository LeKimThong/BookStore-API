import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { badRequest, notAuth } from './handle_errors'

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization
    if(!token)return badRequest('Require authorization', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        const isChecked = err instanceof TokenExpiredError
        
        if(!isChecked ) return notAuth('Acces token was invalid', res, isChecked)
        
        if(isChecked)return notAuth('Acces token was expired', res, isChecked)
        
        req.user = user
        next()
    })
 }

export default verifyToken 