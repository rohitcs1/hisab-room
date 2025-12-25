import express from 'express';
import { getExpenses, createExpense } from '../controllers/expense.controller.js';

const router = express.Router();

router.get('/:groupId', getExpenses);
router.post('/', createExpense);

export default router;