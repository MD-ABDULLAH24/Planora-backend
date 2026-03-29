import { sign, verify, JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: object,
  secret: string,
  expiresIn?: string | number
) => {
  const options: SignOptions = {
    // ✅ cast to any to bypass TS error
    expiresIn: expiresIn as any,
  };

  return sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  return verify(token, secret) as JwtPayload;
};