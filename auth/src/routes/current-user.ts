import express from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/authentication-error';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    throw new AuthenticationError('user not authorized');
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    return res.send({ currentUser: payload });
  } catch (error) {
    throw new AuthenticationError('user not authorized');
  }
});

export { router as currentUserRouter };
