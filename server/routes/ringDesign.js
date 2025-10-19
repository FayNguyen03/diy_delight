import express from 'express'
import RingController from "../controllers/ringDesign.js"

const router = express.Router();

router.get('/', RingController.getAllRingDesigns);
    
router.get('/:id', RingController.getRingDesignById);

router.post('/', RingController.createRingDesign);

router.patch('/:id', RingController.updateRingDesign);

router.delete('/:id', RingController.deleteRingDesign);

export default router;