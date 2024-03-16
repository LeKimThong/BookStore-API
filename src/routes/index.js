import user from './user'
import auth from './auth'
import { internalserverError } from '../middlewares/handle_errors'

const initRoutes = (app) => {

    app.use('/api/v1/user', user)
    app.use('/api/v1/auth', auth)

    app.use(internalserverError);
}
module.exports = initRoutes