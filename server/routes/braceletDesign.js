import express from 'express'
import BraceletDesign from "../controllers/braceletDesign.js"

const router = express.Router();

router.get('/', BraceletDesign.getAllBraceletDesigns);
    
router.get('/:id', BraceletDesign.getBraceletDesignById);

router.post('/', BraceletDesign.createBraceletDesign);

router.patch('/:id', BraceletDesign.updateBraceletDesign);

router.delete('/:id', BraceletDesign.deleteBraceletDesign);

export default router;