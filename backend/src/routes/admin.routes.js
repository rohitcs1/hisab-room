import express from 'express';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { getAdminStats, getAllUsers, getAllGroups } from '../controllers/admin.controller.js';

const router = express.Router();

// All admin routes require admin authentication
router.use(requireAdmin);

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.get('/groups', getAllGroups);

export default router;