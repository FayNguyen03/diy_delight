import express from 'express'
import EarringController from "../controllers/earringDesign.js"

const router = express.Router();

router.get('/', EarringController.getAllEarringDesigns);
    
router.get('/:id', EarringController.getEarringDesignById);

router.post('/', EarringController.createEarringDesign);

router.patch('/:id', EarringController.updateEarringDesign);

router.delete('/:id', EarringController.deleteEarringDesign);

export default router;