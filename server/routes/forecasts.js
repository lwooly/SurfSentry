import Router from "express-promise-router";
import { get } from "../lib/apiFunctions/regions/controllers.js";
import { getAllForecasts } from "../lib/apiFunctions/forecasts/controllers.js";

const router = new Router();

router.get("/", getAllForecasts);

export default router;
