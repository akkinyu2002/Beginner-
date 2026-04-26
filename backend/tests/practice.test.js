const request = require('supertest');
const app = require('../src/app');

describe('POST /practice/validate', () => {
  it('returns success for valid looping solution', async () => {
    const response = await request(app)
      .post('/practice/validate')
      .send({ code: 'for i in range(1, 6):\n    print(i)' });

    expect(response.status).toBe(200);
    expect(response.body.passed).toBe(true);
  });

  it('returns feedback for empty code', async () => {
    const response = await request(app).post('/practice/validate').send({ code: '' });

    expect(response.status).toBe(400);
    expect(response.body.passed).toBe(false);
  });
});
