import db from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { where } from 'sequelize'
import { badRequest, notAuth } from '../middlewares/handle_errors'

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
        const access_token = response[1] 
                        ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn:'5s'}) 
                        : null

///  JWT_SECRET_REFRESH_TOKEN      
        const refresh_token = response[1] 
                        ? jwt.sign({id: response[0].id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn:'15d'}) 
                        : null              
        resolve({
            err: response[1] ? 0 : 1,
            mes :response[1] ? 'register is succesfully' : 'Email is used',
            'access_token': access_token ? `Bearer ${access_token}` : access_token,
            'refresh_token': refresh_token
        })
       if(refresh_token){
        await db.User.update({
            refresh_token: refresh_token
        }, {
            where: { id: response[0].id}
        })
       }
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
        const access_token = isChecked ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn:'5s'}) : null
    ///  JWT_SECRET_REFRESH_TOKEN      
        const refresh_token = response 
                ? jwt.sign({id: response.id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn:'60s'}) 
                : null    
  
        resolve({
            err: response ? 0 : 1,
            mes :access_token ? 'login is succesfully' : response ? 'Password was wrong' : 'Email has been registered',
            'access_token': access_token ? `Bearer ${access_token}` : access_token,
            'refresh_token': refresh_token
        })
        if(refresh_token){
            await db.User.update({
                refresh_token: refresh_token
            }, {
                where: { id: response.id}
            })
           }
     
    } catch (error) {
        reject(error)
    }
})


export const refreshToken = (refresh_token) => new Promise(async (resolve, reject)=>{
    try {
       const response = await db.User.findOne({
        where: {
            refresh_token
        }
       })
     if(response){
        jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN,(err) => {
            if(err) {
                resolve({
                    err: 1,
                    mes: 'Refresh Token expired. Require login again'
                })
            }else {  
                const access_token = jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn:'120s'})
                resolve({
                    err: access_token ? 0 : 1,
                    mes: access_token ? 'Ok' : 'Failed to generate new access token',
                    'access_token': access_token ? `Bearer ${access_token}` : access_token,
                    'refresh-token': refresh_token
                })
            }

        })
     }
    } catch (error) {
        reject(error)
    }
})