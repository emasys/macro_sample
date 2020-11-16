import request from 'supertest';
import { app } from '../../app';

it('should return a 200 on successful signin', async () => {
 await global.signup();
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test2@test.com',
      password: 'password',
    })
    .expect(400);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
