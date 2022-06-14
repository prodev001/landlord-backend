import express from 'express';
import authJwt from "../middleware/authJwt";
import Landlord_controller from "../controllers/landlord_controller";
import Application_controller from "../controllers/application_controller";
import Claim_controller from "../controllers/claim_controller";
import Building_controller from "../controllers/building_controller";
import User_controller from '../controllers/user_controller';
import Delegation_controller from '../controllers/delegation_controller';

const router = express.Router();

router.get('/active-landlords', authJwt, Landlord_controller.findActiveLandlord);
router.get('/invite-landlords', authJwt, Landlord_controller.findInviteLandlord);
router.get('/buildings', authJwt, Building_controller.getUserBuilding);
router.get('/applications', authJwt, Application_controller.findUserApplication);
router.get('/claims', authJwt, Claim_controller.findUserClaim);
router.post('/get/buildings', authJwt, Building_controller.getUserBuilding);
router.put('/property', authJwt, Delegation_controller.updateProperty);
router.get('/propertymanager/:role', authJwt, Delegation_controller.findPropertyMananger);
router.delete('/landlord', authJwt, Delegation_controller.deleteLandlord, User_controller.deleteLandlord, Landlord_controller.inactiveLandlord, Landlord_controller.findActiveLandlord );
router.delete('/', authJwt, User_controller.deleteUser );

export default router;