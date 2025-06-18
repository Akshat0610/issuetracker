const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const issueRoutes = require('./routes/issue.routes');
const commentRoutes = require('./routes/comment.routes');
const { authenticateToken } = require('./middlewares/auth.middleware');

const app = express();
app.use(express.json());
app.use(cors());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.use('/me', authenticateToken, userRoutes);
app.use('/projects', authenticateToken, projectRoutes);
app.use('/issues', authenticateToken, issueRoutes);
app.use('/issues', authenticateToken, commentRoutes);

module.exports = app;