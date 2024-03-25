import { filename } from '../helper/joi_schema';
import db from '../models'
import { Op } from 'sequelize'
const cloudinary = require('cloudinary').v2;

//READ
export const getBooks = ({page, limit, order ,name,available, ...query}) => new Promise(async (resolve, reject)=>{
    try {
        const queries = {raw: true, nest: true}
        const offset = (!page || +page <=1) ? 0 : (+page - 1)
        const fLimit = +limit || +process.env.LIMIT_BOOK
        queries.offset = offset * fLimit
        queries.limit = fLimit
        if(order) queries.order = [order]
        if(name) query.title = {[Op.substring]: name}
        if(available) query.available = {[Op.between]: available}
        const response = await db.Book.findAndCountAll({
            where:query,
            ...queries,
            attributes: {
                exclude: ['category_code', 'description']
            },
            include: [
                {model: db.Category, attributes:{exclude: ['createdAt', 'updatedAt']}, as: 'categoryData'}
            ]
        })
        
        resolve({
            err: response ? 0 : 1,
            mes :response ? 'Got' : 'Cannot found',
            bookData: response
        })
       
    } catch (error) {
        reject(error)
    }
})

//CREATE
export const createBooks = (body, fileData) => new Promise(async (resolve, reject)=>{
    try {
        const response = await db.Book.findOrCreate({
            where: {title: body?.title},
            defaults: {
                ...body,
                image: fileData?.path,
                filename: fileData?.filename
            }
        })  
        resolve({
            resolve: response[1],
            mes :response[1] ? 'Created' : 'Cannot create new book',
        })
        if(fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)
    } catch (error) {
        reject(error)
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
    }
})

//UPDATE 
export const updateBook = ({bookid, ...body}, fileData) => new Promise(async (resolve, reject)=>{
    try {
        const Book = await db.Book.findByPk(bookid);
        const image = Book.filename
        console.log(fileData.filename)
        if(fileData) body.image = fileData?.path
        body.filename = fileData?.filename 
        const response = await db.Book.update(body, {
            where: {id: bookid }
        })  
        resolve({
            err: response[0] ? 0 : 1,
            mes :response[0] ? `${response[0]} book updated` : 'cannot update new book',
        })
        if(response[0] === 1) cloudinary.uploader.destroy(image)
        if(fileData && !response[0]==1){
            cloudinary.uploader.destroy(fileData.filename)
        }
    } catch (error) {
        reject(error)
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
    }
})

//DELETE 
export const deleteBook = (bookids, filename) => new Promise(async (resolve, reject)=>{
    try {
        const response = await db.Book.destroy({
            where: {id: bookids }
        })  
        resolve({
            err: response > 0 ? 0 : 1,
            mes: `${response} book(s) delete`
        })
       cloudinary.api.delete_resources(filename)
    } catch (error) {
        reject(error)
       
    }
})