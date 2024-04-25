import users from "./users.js";
import serviceWorkers from "./serviceWorkers.js";
import pushManager from "./pushManager.js";
import surfSpots from "./spots.js"
import regions from './regions.js'


const mountRoutes = (app) => {
  app.use("/users", users);
  app.use("/save-subscription", serviceWorkers);
  app.use("/send-notification", pushManager);
  app.use("/surf-spots", surfSpots);
  app.use("/regions", regions)

};

export default mountRoutes;
