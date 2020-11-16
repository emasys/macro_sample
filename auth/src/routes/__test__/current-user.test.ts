import request from 'supertest';
import { app } from '../../app';

it('should return a 200 on fetching current user', async () => {
  const cookie = await global.signup();
  return request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200);
});

it('should return a 401 on failure to fetch current user', async () => {
  return request(app)
    .get('/api/users/currentuser')
    .expect(401);
});
