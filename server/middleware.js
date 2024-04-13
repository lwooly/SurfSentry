import express from "express";
import cors from "cors"
import { addSWSubscription } from "./lib/apiFunctions/SWsubscriptions/controllers.js";
import { sendPushNotification } from "./lib/apiFunctions/pushManager/controllers.js";
import { auth } from "express-oauth2-jwt-bearer"
import validateAccessToken from "./middleware/auth0.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

export default function(app) {
    app.use(cors())
    app.use(express.json())
    
    //Authorised acces only
    app.use(validateAccessToken) // TODO - handle error messages properly
    app.use(errorHandler)

// Routes
    // save service worker subscription
    app.post('/save-subscription', addSWSubscription)



    // this get request fires the notification - could be another way CRON etc.
    app.get('/send-notification', sendPushNotification)
}