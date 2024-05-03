import express from "express";
import cors from "cors"
import mountRoutes from "./routes/index.js";

export default function(app) {
    app.use(cors())
    app.use(express.json())
    // Routes
    mountRoutes(app)
}