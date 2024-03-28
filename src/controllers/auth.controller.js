import * as services from "../services/";
import { internalserverError, badRequest } from "../middlewares/handle_errors";
import { email, password, refresh_token } from "../helper/joi_schema";
import Joi  from "joi";

export const register = async (req, res) => {
    try {
        const {error} = Joi.object({email, password}).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await services.register(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
 }

export const login = async (req, res) => {
    try {
         const {error} = Joi.object({email, password}).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await services.login(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return internalserverError(res)
    }    
 }

 export const refreshToken = async (req, res) => {
    try {
        const {error} = Joi.object({refresh_token}).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await services.refreshToken(req.body.refresh_token)
        return res.status(200).json(response)

    } catch (error) {
        return internalserverError(res)
    }    
 }