import express from 'express';
import authJwt from "../middleware/authJwt";
import Landlord_controller from "../controllers/landlord_controller";
import Application_controller from "../controllers/application_controller";
import Claim_controller from "../controllers/claim_controller";
import Building_controller from "../controllers/building_controller";

const router = express.Router();

router.get('/landlords', authJwt, Landlord_controller.findLandlord);
router.get('/applications', authJwt, Application_controller.findUserApplication);
router.get('/claims', authJwt, Claim_controller.findUserClaim);
router.get('/buildings', authJwt, Building_controller.findUserBuilding);

export default router;