import express from 'express';
import userRoutes from './routes/userRoutes.js';
import elementRoutes from './routes/elementRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import projectRoutes from './routes/projectRoutes.js'; // Import project routes

const app = express();
app.use(express.json());

/**
 * Use authentication routes
 * @route /api/v1/auth
 */
app.use('/api/v1/auth', authRoutes);

/**
 * Use user routes
 * @route /api/v1/users
 */
app.use('/api/v1/users', userRoutes);

/**
 * Use element routes
 * @route /api/v1/elements
 */
app.use('/api/v1/elements', elementRoutes);

/**
 * Use category routes
 * @route /api/v1/categories
 */
app.use('/api/v1/categories', categoryRoutes);

/**
 * Use admin routes
 * @route /api/v1/admin
 */
app.use('/api/v1/admin', adminRoutes);

/**
 * Use project routes
 * @route /api/v1/projects
 */
app.use('/api/v1/projects', projectRoutes);

app.get('/', (req, res) => {
    res.send('Hello from furnishcraft server built with Docker with postgres without frontend for now ;D');
});

export default app;
