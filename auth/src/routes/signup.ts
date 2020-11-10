import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/db-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Provide valid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('must be 4 and 20 chars'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }
    throw new DatabaseConnectionError();
    const { email, password } = req.body;
    res.status(201).send({ email, password });
  }
);

export { router as signUpRouter };
