import express from "express";
import cors from "cors"
import mountRoutes from "./routes/index.js";
import { cron } from "./tasks/tasks.js";

export default function(app) {
    app.use(cors())
    app.use(express.json())
    app.use('/cron', cron)
    // Routes
    mountRoutes(app)
}