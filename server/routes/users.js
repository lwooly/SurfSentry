import Router from 'express-promise-router'
import { createUser } from "../lib/apiFunctions/users/controllers.js";

const router = new Router();

export default router;

router.get('/:id', getUsers)
router.post('/', createUser)