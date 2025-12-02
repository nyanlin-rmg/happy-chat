import e from "express";
import { signin, signout, signup, updateProfile } from "../controllers/auth.controller.js";
import {signupRules, validateUser} from "../lib/validators.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../lib/fileupload.js";
const router = e.Router();


router.post('/signup', signupRules, validateUser, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.put('/update-profile', protectedRoute, upload.single('profilePic'), updateProfile);
router.get('/check', protectedRoute, (req, res) => res.status(200).json({
    meta: {
        id: req.user._id
    },
    data: {
        user: req.user
    }
}));

router.get('/test-limit', (req, res) => res.json({message: 'Pass limit'}))


export default router;