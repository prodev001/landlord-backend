import express, { Router } from 'express';

import verifySignUp from "../middleware/verifySignUp";
import { signup, signin, emailVerify } from "../controllers/auth_controller";

const router = express.Router();

router.post(
    "/emailverify",
    emailVerify,
);

router.post(
    "/signup",
    verifySignUp,
    signup
);

router.post("/signin", signin);

export default router;