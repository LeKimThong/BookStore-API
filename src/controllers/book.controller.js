import * as services from "../services/";
import { internalserverError, badRequest } from "../middlewares/handle_errors";
import { title, image, category_code, available,price,bookid, bookids, filename, description } from "../helper/joi_schema";
import Joi  from "joi";
const cloudinary = require('cloudinary').v2;



export const getBooks = async (req, res) => {
    try {
        const response = await services.getBooks(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
 }

export const createBooks = async (req, res) => {
    try {
        const fileData = req.file
        const {error}= Joi.object({title, image, category_code, available, price, description}).validate({...req.body, image: fileData?.path})
        
        if(error){
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        } 
        const response = await services.createBooks(req.body, fileData)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
 } 

export const updateBook = async (req, res) => {
    try {
        const fileData = req.file
        const {error}= Joi.object({bookid}).validate({bookid: req.body.bookid})
        
        if(error){
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        } 
        const response = await services.updateBook(req.body, fileData)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
 } 

 export const deleteBook = async (req, res) => {
    try {
       
        const {error}= Joi.object({bookids, filename}).validate(req.query)
        
        if(error){
            return badRequest(error.details[0].message, res)
        } 
        const response = await services.deleteBook(req.query.bookids, req.query.filename)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
 } 