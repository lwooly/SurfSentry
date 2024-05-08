import express from "express";
import cors from "cors"
import mountRoutes from "./routes/index.js";

export default function(app) {
    app.use(cors())
    app.use(express.json())

    //  //Authorised acces only
    //  app.use(validateAccessToken) // TODO - handle error messages properly
    //  app.use(errorHandler)

    // Routes
    mountRoutes(app)
}