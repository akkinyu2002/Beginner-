const path = require('path');
const fs = require('fs');

const lessonFilePath = path.resolve(__dirname, '../../../shared/content/lessons/python-intro.json');

function getPythonLesson() {
  const lessonJson = fs.readFileSync(lessonFilePath, 'utf-8');
  return JSON.parse(lessonJson);
}

module.exports = {
  getPythonLesson,
};
