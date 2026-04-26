const request = require('supertest');
const app = require('../src/app');

describe('GET /lesson', () => {
  it('returns python lesson data from json', async () => {
    const response = await request(app).get('/lesson');

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Python Variables and Print');
    expect(response.body).toMatchObject({
      title: expect.any(String),
      simple: expect.any(String),
      advanced: expect.any(String),
      code: expect.any(String),
      explanation: expect.any(String),
    });
    expect(Array.isArray(response.body.lineExplanations)).toBe(true);
  });
});

describe('GET /lesson/list', () => {
  it('returns lesson catalog sorted by order', async () => {
    const response = await request(app).get('/lesson/list');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.lessons)).toBe(true);
    expect(response.body.lessons.length).toBeGreaterThanOrEqual(3);
    expect(response.body.lessons[0].slug).toBe('python-intro');
  });
});

describe('GET /lesson/:slug', () => {
  it('returns the requested lesson by slug', async () => {
    const response = await request(app).get('/lesson/python-loops');

    expect(response.status).toBe(200);
    expect(response.body.slug).toBe('python-loops');
    expect(response.body.title).toBe('Python For Loops');
  });

  it('returns 404 when lesson slug does not exist', async () => {
    const response = await request(app).get('/lesson/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Lesson not found.');
  });
});
