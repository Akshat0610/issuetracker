const request = require('supertest');
const app = require('../src/app');
const { generateToken: generateTestToken } = require('../src/utils/jwt');
process.env.JWT_SECRET = 'testsecret123';

describe('GET /projects - pagination', () => {
  it('should return paginated project list', async () => {
    const token = generateTestToken(user = { id: 1 });
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
