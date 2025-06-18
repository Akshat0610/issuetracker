const request = require('supertest');
const app = require('../src/app');
const { generateToken: generateTestToken } = require('../src/utils/jwt');

describe('GET /projects - pagination', () => {
  it('should return paginated project list', async () => {
    const token = generateTestToken(); // mock JWT
    const res = await request(app)
      .get('/projects?page=1&limit=2')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('page');
    expect(res.body).toHaveProperty('limit');
  });
});
