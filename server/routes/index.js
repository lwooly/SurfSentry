import users from "./users.js";
import serviceWorkers from "./serviceWorkers.js";
import pushManager from "./pushManager.js";
import surfSpots from "./spots.js"

const mountRoutes = (app) => {
  app.use("/users", users);
  app.use("/save-subscription", serviceWorkers);
  app.use("/send-notification", pushManager);
  app.use("/surf-spots", surfSpots);
};

export default mountRoutes;
