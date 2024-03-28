import joi from 'joi'

export const email = joi.string()
                        .pattern(new RegExp('gmail.com$'))
                        .required()

export const password = joi.string()
                           .min(6)
                           .required()    
                           
export const title = joi.string()
                        .required()
                        
export const price = joi.number()
                        .required()

export const available = joi.number()
                        .required()

export const category_code = joi.string()
                        .uppercase()
                        .alphanum()
                        .required()

export const image = joi.string()
                        .required()

export const bookid = joi.string()
                        .required()                        

export const bookids = joi.array()
                        .required()                            

export const filename = joi.array()
                        .required()


export const description = joi.string()

export const refresh_token = joi.string()
                                .required()

export const code = joi.string()
                       .required()
                       
export const value = joi.string()
                       .required()                                
                                                                    
                                                               