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
