import express from 'express';
import { getBalance } from '../controllers/balance.controller.js';

const router = express.Router();

router.get('/', getBalance);

export default router;