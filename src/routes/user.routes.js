import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteUserProfile, getUserProfile, registerUser } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(
    upload.fields(
        [
            { name: 'avatar', maxCount: 1 },
            { name: 'resume', maxCount: 1 }
        ]
    ),
    registerUser
);

router.route('/send-email-otp').post();

router.route('/verify-email-otp').post();

router.route('/send-phone-otp').post();

router.route('/verify-phone-otp').post();

router.route('/login').post();

// protected routes
router.route('/').get(isAuthenticated, getUserProfile);

router.route('/').delete(isAuthenticated, deleteUserProfile);

export default router;

