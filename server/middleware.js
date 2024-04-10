import express from "express";
import cors from "cors"
import { addSWSubscription } from "./lib/apiFunctions/SWsubscriptions/controllers.js";
import { sendPushNotification } from "./lib/apiFunctions/pushManager/controllers.js";


export default function(app) {
    app.use(cors())
    app.use(express.json())
    app.use(express.static('public'))


    // save service worker subscription
    app.post('/save-subscription', addSWSubscription)

    // this get request fires the notification - could be another way CRON etc.
    app.get('/send-notification', sendPushNotification)
}