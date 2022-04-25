import express from 'express';
import authJwt from "../middleware/authJwt";
import Building_controller from "../controllers/building_controller";
import Application_controller from "../controllers/application_controller";
import Claim_controller from '../controllers/claim_controller';
import Policy_controller from '../controllers/policy_controller';

const router = express.Router();

router.get('/buildings', authJwt, Building_controller.findBuilding);
router.get('/application', authJwt, Application_controller.findApplication);
router.get('/claim', authJwt, Claim_controller.findClaim);
router.get('/policy', authJwt, Policy_controller.findPolicy);

export default router;