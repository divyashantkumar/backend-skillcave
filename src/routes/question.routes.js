import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware.js";
import { addQuestion, deleteQuestion } from "../controllers/question.controllers.js";

const router = Router();

router.route('/').post(
    isAuthenticated, 
    restrictTo(['admin', 'instructor']), 
    addQuestion
);

router.route('/').delete(
    isAuthenticated, 
    restrictTo(['admin', 'instructor']), 
    deleteQuestion
);


export default router;