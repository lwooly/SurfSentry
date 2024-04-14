import express from "express";
import cors from "cors"
import { addSWSubscription } from "./lib/apiFunctions/SWsubscriptions/controllers.js";
import { sendPushNotification } from "./lib/apiFunctions/pushManager/controllers.js";
import { auth } from "express-oauth2-jwt-bearer"
import validateAccessToken from "./middleware/auth0.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import { createUser } from "./lib/apiFunctions/users/controllers.js";
import mountRoutes from "./routes/index.js";

export default function(app) {
    app.use(cors())
    app.use(express.json())

   //Authorised access only
   app.use(validateAccessToken) // TODO - handle error messages properly
   app.use(errorHandler)

    // Routes
    mountRoutes(app)




    

}