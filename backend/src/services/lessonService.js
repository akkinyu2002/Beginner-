const path = require('path');
const fs = require('fs');

const lessonsDirectoryPath = path.resolve(__dirname, '../../../shared/content/lessons');

function getAllLessons() {
  const lessonFileNames = fs.readdirSync(lessonsDirectoryPath).filter((fileName) => fileName.endsWith('.json'));

  const lessons = lessonFileNames.map((fileName) => {
    const lessonFilePath = path.join(lessonsDirectoryPath, fileName);
    const lessonJson = fs.readFileSync(lessonFilePath, 'utf-8');
    return JSON.parse(lessonJson);
  });

  return lessons.sort((firstLesson, secondLesson) => {
    const firstOrder = firstLesson.order ?? Number.MAX_SAFE_INTEGER;
    const secondOrder = secondLesson.order ?? Number.MAX_SAFE_INTEGER;
    return firstOrder - secondOrder;
  });
}

function getLessonCatalog() {
  return getAllLessons().map((lesson) => ({
    id: lesson.id || lesson.slug,
    slug: lesson.slug,
    title: lesson.title,
    order: lesson.order,
    summary: lesson.simple,
  }));
}

function getPythonLesson() {
  const lessons = getAllLessons();
  return lessons[0] || null;
}

function getLessonBySlug(slug) {
  return getAllLessons().find((lesson) => lesson.slug === slug) || null;
}

module.exports = {
  getLessonBySlug,
  getLessonCatalog,
  getPythonLesson,
};
