import express from 'express'
import DetailsController from "../controllers/details.js"

const router = express.Router();

router.get('/charms', DetailsController.getAllCharms);
    
router.get('/stones', DetailsController.getAllStones);

router.get('/earringStyles', DetailsController.getAllEarringStyles);

router.get('/materials', DetailsController.getAllMaterials);

export default router;