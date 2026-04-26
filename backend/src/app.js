const express = require('express');
const cors = require('cors');
const lessonRoutes = require('./routes/lessonRoutes');
const practiceRoutes = require('./routes/practiceRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/lesson', lessonRoutes);
app.use('/practice', practiceRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
