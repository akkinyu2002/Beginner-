const express = require('express');
const { getLessonBySlug, getLessonCatalog, getPythonLesson } = require('../services/lessonService');

const router = express.Router();

router.get('/list', (_req, res) => {
  const lessons = getLessonCatalog();
  res.status(200).json({ lessons });
});

router.get('/:slug', (req, res) => {
  const lesson = getLessonBySlug(req.params.slug);

  if (!lesson) {
    res.status(404).json({ message: 'Lesson not found.' });
    return;
  }

  res.status(200).json(lesson);
});

router.get('/', (_req, res) => {
  const lesson = getPythonLesson();

  if (!lesson) {
    res.status(404).json({ message: 'No lessons available.' });
    return;
  }

  res.status(200).json(lesson);
});

module.exports = router;
