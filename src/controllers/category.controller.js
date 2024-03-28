import * as services from "../services/";
import { internalserverError, badRequest } from "../middlewares/handle_errors";
import {code, value } from "../helper/joi_schema";
import Joi  from "joi";
const cloudinary = require('cloudinary').v2;



export const getCategory = async (req, res) => {
    try {
        const response = await services.getcategory(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
}

export const createCategory = async (req, res) => {
    try {

        const {error}= Joi.object({code, value}).validate({...req.body})
        if(error){
            return badRequest(error.details[0].message, res)
        } 
        const response = await services.createCategory(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
 } 