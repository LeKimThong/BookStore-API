import { filename } from '../helper/joi_schema';
import db from '../models'
import { Op } from 'sequelize'
const cloudinary = require('cloudinary').v2;


export const getcategory = ({page, limit, order ,value, ...query}) => new Promise(async (resolve, reject)=>{
    try {
        const queries = {raw: true, nest: true}
        const offset = (!page || +page <=1) ? 0 : (+page - 1)
        const fLimit = +limit || +process.env.LIMIT_CATEGORY
        queries.offset = offset * fLimit
        queries.limit = fLimit
        if(order) queries.order = [order]
        if(value) query.value = {[Op.substring]: value}
        const response = await db.Category.findAndCountAll({
            where:query,
            ...queries,
            attributes: {
                include: ['id', 'code','value']
            }
        })
        
        resolve({
            err: response ? 0 : 1,
            mes :response ? 'Got' : 'Cannot found',
            CategoryData: response
        })
       
    } catch (error) {
        reject(error)
    }
})


/// CREATE
export const createCategory = (body, fileData) => new Promise(async (resolve, reject)=>{
    try {
        const response = await db.Category.findOrCreate({
            where: {code: body?.code},
            defaults: {
                ...body
            }
        })  
        resolve({
            resolve: response[1],
            mes :response[1] ? 'Created' : 'Cannot create new category',
        })
    } catch (error) {
        reject(error)
    }
})