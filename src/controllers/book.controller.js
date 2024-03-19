import * as services from "../services/";
import { internalserverError, badRequest } from "../middlewares/handle_errors";
import { title, image, category_code, available,price } from "../helper/joi_schema";
import Joi  from "joi";
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
        const {error}= Joi.object({title, image, category_code, available, price}).validate(req.body)
        if(error) return badRequest(error.details[0].message, res)
        const response = await services.createBooks(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
 } 