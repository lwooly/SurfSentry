import Router from 'express-promise-router'
import { sendPushNotification } from "../lib/apiFunctions/pushManager/controllers.js";

const router = new Router();

export default router;

    // this get request fires the notification - could be another way CRON etc.
    router.get('/', sendPushNotification)