import users from './users.js'
import serviceWorkers from './serviceWorkers.js'
import pushManager from './pushManager.js'
 
const mountRoutes = (app) => {
  app.use('/users', users)
  app.use('/save-subscription', serviceWorkers)
  app.use('/send-notification', pushManager)
}
 
export default mountRoutes;