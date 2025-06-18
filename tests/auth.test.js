const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Auth API', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const email = `testuser_${Date.now()}@example.com`;

  it('should sign up a new user', async () => {
    const res = await request(app).post('/auth/signup').send({
      name: 'Test User',
      email,
      password: 'password123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('should not allow signup with existing email', async () => {
    const res = await request(app).post('/auth/signup').send({
      name: 'Test User',
      email,
      password: 'password123'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});