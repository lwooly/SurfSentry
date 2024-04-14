import Router from "express-promise-router";
import { getSurfSpots, subscribeUserToSpot } from "../lib/apiFunctions/surfSpots/controllers.js";

const router = new Router();

router.get("/", getSurfSpots);
router.post('/:spotId/subscribe', subscribeUserToSpot)

export default router;


