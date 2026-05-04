require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ status: 'failed', message: 'Invalid JSON payload' });
  }
  next();
});

// ROUTES
app.use(require('./routes/userRoutes'));
app.use(require('./routes/authRoutes'));
app.use(require('./routes/companyRoutes'));
app.use(require('./routes/categoryRoutes'));
app.use(require('./routes/jobRoutes'));
app.use(require('./routes/applicationRoutes'));
app.use(require('./routes/bookmarksRoutes'));
app.use(require('./routes/documentRoutes'));

app.get('/', (req, res) => res.json({ status: 'success', message: 'OpenJob API jalan!' }));

app.use(errorHandler);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server jalan di http://${HOST}:${PORT}`);
});
