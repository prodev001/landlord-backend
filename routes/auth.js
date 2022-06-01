import express, { Router } from 'express';
import authJwt from "../middleware/authJwt";
import verifySignUp from "../middleware/verifySignUp";
import { signup, signin, emailVerify, checkToken, setDeclineReason } from "../controllers/auth_controller";

const router = express.Router();

router.post( "/emailverify", emailVerify);
router.post("/signup", verifySignUp, signup);
router.post("/signin", signin);
router.get("/check-token", checkToken)
router.post("/decline-invite", setDeclineReason)

export default router;