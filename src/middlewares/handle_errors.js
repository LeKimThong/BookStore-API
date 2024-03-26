import createHttpError from "http-errors"

export const badRequest = (err, res) => {
     const error = createHttpError.BadRequest(err)
     return res.status(error.status).json({
          err : 1,
          mes : error.message
     })
    }

export const internalserverError = (res) => {
     const error = createHttpError.InternalServerError()
     return res.status(error.status).json({
          err : 1,
          mes : error.message
     })
    }   
 
export const notFound = (req, res) => {
     const error = createHttpError.NotFound('This route is not define')
     return res.status(error.status).json({
          err : 1,
          mes : error.message
     })
    }    

export const notAuth = (err, res, isExpired) => {
     const error = createHttpError.Unauthorized(err)
     return res.status(error.status).json({
          err : isExpired ? 2 : 1,
          mes : error.message
     })
    }   