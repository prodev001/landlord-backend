import express from 'express';
import authJwt from "../middleware/authJwt";

import InviteController from '../controllers/invite_controller';

const router = express.Router();

router.get('/invite-property', authJwt, InviteController.findInviteBuilding);
router.post('/landlord-invite', authJwt,  InviteController.createLandlordInvite)
router.post('/invite-user', authJwt, InviteController.createUserInvite);

export default router;