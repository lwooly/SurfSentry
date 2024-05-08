import Router from "express-promise-router";
import { runCronTasks } from "../lib/apiFunctions/cron/controllers.js";


const router = new Router();

router.get("/", runCronTasks);

export default router;
