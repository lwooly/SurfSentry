import Router from "express-promise-router";
import { addSWSubscription } from "../lib/apiFunctions/SWsubscriptions/controllers.js";

const router = new Router();

// save service worker subscription
router.post("/", addSWSubscription);

export default router;
