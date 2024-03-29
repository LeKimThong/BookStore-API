import db from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(7))

export const register = ({email, password}) => new Promise(async (resolve, reject)=>{
    try {
        const response = await db.User.findOrCreate({
            where:{email},
            defaults:{
                email,
                password : hashPassword(password)
            }
        })
        const token = response[1] ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn:'5d'}) : null
        resolve({
            err: response[1] ? 0 : 1,
            mes :response[1] ? 'register is succesfully' : 'Email is used',
            'access-token': `Bearer ${token}`
        })
        // resolve({
        //     err: 0,
        //     mes : 'register resolve'
        // })
    } catch (error) {
        reject(error)
    }
})

export const login = ({email, password}) => new Promise(async (resolve, reject)=>{
    try {
        const response = await db.User.findOne({
            where:{email},
            raw :true
        })
        const isChecked = response && bcrypt.compareSync(password, response.password)
        const token = isChecked ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn:'5d'}) : null
        resolve({
            err: response ? 0 : 1,
            mes :token ? 'login is succesfully' : response ? 'Password was wrong' : 'Email has been registered',
            'access-token': token ? `Bearer ${token}` : null
        })
     
    } catch (error) {
        reject(error)
    }
})