import Router from 'express-promise-router'
import { addSWSubscription } from "../lib/apiFunctions/SWsubscriptions/controllers.js";

const router = new Router()

export default router;
    // save service worker subscription
    router.post('/', addSWSubscription)