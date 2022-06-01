import express from 'express';
import authJwt from "../middleware/authJwt";
import Delegation_controller from '../controllers/delegation_controller';
import Landlord_controller from '../controllers/landlord_controller';
import Building_controller from '../controllers/building_controller';
import Request_controller from '../controllers/request_controller'

const router = express.Router();

router.get('/', authJwt, Request_controller.findEmail);
router.delete('/', authJwt, Request_controller.destroyById, Request_controller.findEmail);
router.post('/landlord-invite', authJwt, Landlord_controller.sendInviteEmail)

export default router;