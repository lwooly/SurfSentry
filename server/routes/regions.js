import Router from "express-promise-router";
import { getRegions } from "../lib/apiFunctions/regions/controllers.js";

const router = new Router();

router.get("/", getRegions);


export default router;


