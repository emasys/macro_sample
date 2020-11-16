import request from 'supertest';
import { app } from '../../app';

it('should return a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('should return a 400 on an unsuccessful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pas',
    })
    .expect(400);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test.test.com',
      password: 'password',
    })
    .expect(400);
});

it('should return a 409 on duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(409);
});

it('should set cookie on successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

      expect(response.get('Set-Cookie')).toBeDefined();
  });