import Router from "express-promise-router";
import { getAllForecasts } from "../lib/apiFunctions/forecasts/controllers.js";

const router = new Router();

router.get("/", getAllForecasts);

export default router;
