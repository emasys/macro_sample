import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserDoc } from '../models/user';

export const setJWTCookie = (req: Request, user: UserDoc) => {
  const userToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );
  //set cookie session
  req.session = {
    jwt: userToken,
  };
};
