import * as services from "../services/";
import { internalserverError, badRequest } from "../middlewares/handle_errors";

export const getCurrently = async (req, res) => {
    try {
       const {id} = req.user
        const response = await services.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalserverError(res)
    }     
 }