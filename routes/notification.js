import express from 'express';
import authJwt from "../middleware/authJwt";
import Delegation_controller from '../controllers/delegation_controller';
import Landlord_controller from '../controllers/landlord_controller';
import Building_controller from '../controllers/building_controller';
import Request_controller from '../controllers/request_controller'

const router = express.Router();

// router.get('/', authJwt, Request_controller.getNotification);
router.get('/activity', authJwt, Request_controller.setUserActivity);
router.get('/to', authJwt, Request_controller.findRequestTo);
router.get('/from', authJwt, Request_controller.findRequestFrom);
router.get('/accept', authJwt, Request_controller.acceptRequest, Request_controller.findRequestFrom);
router.post('/decline', authJwt, Request_controller.declineRequest, Request_controller.findRequestFrom);
router.delete('/', authJwt, Request_controller.destroyById, Request_controller.findRequestFrom);
router.put('/update-property', authJwt, Request_controller.updateProperty)

export default router;