const express = require('express');

const router = express.Router();

router.post('/validate', (req, res) => {
  const { code } = req.body;

  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({
      passed: false,
      feedback: 'Please write some code before submitting.',
    });
  }

  const normalizedCode = code.toLowerCase();
  const hasLoop = normalizedCode.includes('for');
  const hasPrint = normalizedCode.includes('print(');

  if (hasLoop && hasPrint) {
    return res.status(200).json({
      passed: true,
      feedback: 'Great job! You used a loop and print correctly.',
    });
  }

  return res.status(200).json({
    passed: false,
    feedback: 'Try using a for loop and print each number from 1 to 5.',
  });
});

module.exports = router;
