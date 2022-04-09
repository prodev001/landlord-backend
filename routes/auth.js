import express, { Router } from 'express';

import middleware from "../middleware";
import { signup, signin } from "../controllers/auth";

const router = express.Router();
const { verifySignUp } = middleware;

router.post(
    "/signup",
    verifySignUp.checkDuplicateUsernameOrEmail,
    signup
);

router.post("/signin", signin);

export default router;