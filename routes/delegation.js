import express from 'express';
import authJwt from "../middleware/authJwt";
import Delegation_controller from '../controllers/delegation_controller';
import Landlord_controller from '../controllers/landlord_controller';
import Building_controller from '../controllers/building_controller';
import Request_controller from '../controllers/request_controller'

const router = express.Router();

router.post('/invite-user', authJwt, Request_controller.InviteCreate);
router.get('/invite-property', authJwt, Delegation_controller.findInviteBuilding);
router.get('/request-landlord', authJwt, Landlord_controller.findActiveLandlord);
router.get('/request-vp', authJwt, Delegation_controller.findVP);
router.get('/request-building', authJwt, Building_controller.findAllBuilding);
router.post('/request-userproperty', authJwt, Delegation_controller.findRequestUserProperty);
router.post('/request-property', authJwt, Request_controller.RequestCreate);

export default router;