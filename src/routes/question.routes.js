import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/').post(
    isAuthenticated, 
    restrictTo(['admin', 'instructor']), 
    (req, res) => { }
);


export default router;