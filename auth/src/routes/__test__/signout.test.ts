import request from 'supertest';
import { app } from '../../app';

it('should return a 200 on successful sign out', async () => {
  await global.signup();
  const res = await request(app).post('/api/users/signout').expect(200);
  // empty cookie
  expect(res.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
