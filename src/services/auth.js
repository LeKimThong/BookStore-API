import db from '../models'
import bcrypt from 'bcrypt'

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
        resolve({
            err: response[1] ? 0 : 1,
            mes :response[1] ? 'register is succesfully' : 'Email is used'
        })
        // resolve({
        //     err: 0,
        //     mes : 'register resolve'
        // })
    } catch (error) {
        reject(error)
    }
})