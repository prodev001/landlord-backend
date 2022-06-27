import express from 'express';
import authJwt from "../middleware/authJwt";
import Delegation_controller from '../controllers/delegation_controller';
import Landlord_controller from '../controllers/landlord_controller';
import Building_controller from '../controllers/building_controller';
import Notification_controller from '../controllers/request_controller'

const router = express.Router();

router.get('/', authJwt, Notification_controller.findEmail);
router.delete('/', authJwt, Notification_controller.destroyById, Notification_controller.findEmail);

export default router;