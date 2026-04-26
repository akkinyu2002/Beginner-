const DEFAULT_API_BASE_URL = 'http://localhost:4000';

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
}

async function fetchLesson() {
  const response = await fetch(`${getApiBaseUrl()}/lesson`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load lesson content.');
  }

  return response.json();
}

async function validatePracticeCode(code) {
  const response = await fetch(`${getApiBaseUrl()}/practice/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.feedback || 'Validation failed.');
  }

  return payload;
}

export { fetchLesson, getApiBaseUrl, validatePracticeCode };
