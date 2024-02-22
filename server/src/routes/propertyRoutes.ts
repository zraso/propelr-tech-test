import express from 'express';
import { getProperties, addProperty } from '../controllers/propertyController';

const router = express.Router();

router.get('/properties', getProperties);
router.post('/properties', addProperty);

export default router;