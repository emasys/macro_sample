import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { setJWTCookie } from './util';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Provide valid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('must be 4 and 20 chars'),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) throw new BadRequestError('email in use', 409);
    const newUser = User.build({ email, password });
    await newUser.save();
    setJWTCookie(req, newUser);
    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
