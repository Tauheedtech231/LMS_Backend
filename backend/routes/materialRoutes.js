import express from 'express';
import {
  getMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from '../controllers/materialController.js';

const router = express.Router();

// Get all materials
router.get('/', getMaterials);

// Get single material by ID
router.get('/:materialId', getMaterialById);

// Create new material
router.post('/', createMaterial);

// Update material
router.put('/:materialId', updateMaterial);

// Delete material
router.delete('/:materialId', deleteMaterial);

export default router;