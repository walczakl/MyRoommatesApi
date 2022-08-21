import express from 'express';
import { login, signup } from '../controllers/auth.js';
import FlatController from '../controllers/flat.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

const flatController = new FlatController();
router.post('/create_flat', flatController.createFlat);

export default router;