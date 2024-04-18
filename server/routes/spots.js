import Router from "express-promise-router";
import { getSurfSpots, subscribeUserToSpot, unSubscribeUserToSpot } from "../lib/apiFunctions/surfSpots/controllers.js";

const router = new Router();

router.get("/:userId?", getSurfSpots);

router.post('/:spotId/subscribe/:userId', subscribeUserToSpot)
router.delete('/:spotId/subscribe/:userId', unSubscribeUserToSpot)

export default router;


