const express = require('express');
const { getPythonLesson } = require('../services/lessonService');

const router = express.Router();

router.get('/', (_req, res) => {
  const lesson = getPythonLesson();
  res.status(200).json(lesson);
});

module.exports = router;
