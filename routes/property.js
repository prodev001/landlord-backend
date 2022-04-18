import express from 'express';
import authJwt from "../middleware/authJwt";
import Building_repository from "../controllers/building_controller";

const router = express.Router();

router.get('/buildings', authJwt, Building_repository.findBuilding);

export default router;