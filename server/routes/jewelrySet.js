import express from 'express'
import JewelrySet from "../controllers/jewelrySet.js"

const router = express.Router();

router.get('/', JewelrySet.getAllJewelrySets);
    
router.get('/:id', JewelrySet.getJewelrySetById);

router.post('/', JewelrySet.createJewelrySet);

router.patch('/:id', JewelrySet.updateJewelrySet);

router.delete('/:id', JewelrySet.deleteJewelrySet);

export default router;