import express, { Router } from 'express';
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import authJwt from "../middleware/authJwt";
import verifySignUp from "../middleware/verifySignUp";
import { 
    signup, 
    signin, 
    emailVerify, 
    checkToken, 
    setDeclineReason,
    editProfile
} from "../controllers/auth_controller";

const router = express.Router();

router.post( "/emailverify", emailVerify);
router.post("/signup", verifySignUp, signup);
router.post("/signin", signin);
router.get("/check-token", checkToken)
router.post("/decline-invite", setDeclineReason)
router.post("/edit-profile", authJwt, upload.single("image"), editProfile);

export default router;