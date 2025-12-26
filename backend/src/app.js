import express from 'express';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.routes.js';
import groupRoutes from './routes/group.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import balanceRoutes from './routes/balance.routes.js';
import adminRoutes from './routes/admin.routes.js';
import profileRoutes from './routes/profile.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check (optional but useful)
app.get('/', (req, res) => {
  res.json({ status: 'HisabRoom backend is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

export default app;
