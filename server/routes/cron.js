import Router from "express-promise-router";
import  cron  from "../lib/apiFunctions/cron/controllers";

const router = new Router();

router.get("/", cron);

export default router;
