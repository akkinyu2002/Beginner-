const DEFAULT_API_BASE_URL = 'http://localhost:4000';

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
}

async function fetchJson(url, options) {
  const response = await fetch(url, {
    cache: 'no-store',
    ...options,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || payload.feedback || 'Request failed.');
  }

  return payload;
}

async function fetchLesson() {
  return fetchJson(`${getApiBaseUrl()}/lesson`);
}

async function fetchLessonBySlug(slug) {
  return fetchJson(`${getApiBaseUrl()}/lesson/${encodeURIComponent(slug)}`);
}

async function fetchLessonCatalog() {
  const response = await fetchJson(`${getApiBaseUrl()}/lesson/list`);
  return response.lessons || [];
}

async function validatePracticeCode(code) {
  return fetchJson(`${getApiBaseUrl()}/practice/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
}

export { fetchLesson, fetchLessonBySlug, fetchLessonCatalog, getApiBaseUrl, validatePracticeCode };
