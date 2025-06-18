const request = require('supertest');
const app = require('../src/app');
const { generateToken: generateTestToken } = require('../src/utils/jwt');

describe('GET /issues - pagination and filters', () => {
  it('should return filtered and paginated issues', async () => {
    const token = generateTestToken();
    const res = await request(app)
      .get('/issues?status=open&page=1&limit=2')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).toHaveProperty('page', 1);
    expect(res.body).toHaveProperty('limit', 2);
  });
});
