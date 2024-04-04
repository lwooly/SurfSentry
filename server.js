import express from "express";
import middleware from "./middleware.js";

const app = express();
middleware(app)

export default app;
