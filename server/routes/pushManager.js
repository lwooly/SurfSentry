import Router from "express-promise-router";
import { sendPushNotification, startSurfCheck } from "../lib/apiFunctions/pushManager/controllers.js";

const router = new Router();

// this get request fires the notification - could be another way CRON etc.
router.get("/", sendPushNotification);

//temp for testing
router.get("/surf-check", startSurfCheck);

export default router;
