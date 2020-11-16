import { Response, Request, Router } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { UserService } from '../services/user';
import { setJWTCookie } from './util';


const router = Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Provide valid email'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    validateRequest
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new BadRequestError('invalid credentials', 400)
    const isValid = await UserService.compare(user.password, password);
    if (!isValid) throw new BadRequestError('invalid credentials', 400)
    setJWTCookie(req, user);
    res.send(user);
  }
);

export { router as signInRouter };
