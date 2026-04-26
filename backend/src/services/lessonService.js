const path = require('path');
const fs = require('fs');

const lessonFilePath = path.join(__dirname, '..', 'data', 'lesson.python.json');

function getPythonLesson() {
  const lessonJson = fs.readFileSync(lessonFilePath, 'utf-8');
  return JSON.parse(lessonJson);
}

module.exports = {
  getPythonLesson,
};
