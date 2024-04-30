import users from "./users.js";
import serviceWorkers from "./serviceWorkers.js";
import pushManager from "./pushManager.js";
import surfSpots from "./spots.js"
import regions from './regions.js'
import forecasts from './forecasts.js'


const mountRoutes = (app) => {
  app.use("/users", users);
  app.use("/save-subscription", serviceWorkers);
  app.use("/send-notification", pushManager);
  app.use("/surf-spots", surfSpots);
  app.use("/regions", regions)
  app.use("/forecasts", forecasts)

};

export default mountRoutes;
