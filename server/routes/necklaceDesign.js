import express from 'express'
import NecklaceController from "../controllers/necklaceDesign.js"

const router = express.Router();

router.get('/', NecklaceController.getAllNecklaceDesign);
    
router.get('/:id', NecklaceController.getNecklaceDesignById);

router.post('/', NecklaceController.createNecklaceDesign);

router.patch('/:id', NecklaceController.updateNecklaceDesign);

router.delete('/:id', NecklaceController.deleteNecklaceDesign);

export default router;