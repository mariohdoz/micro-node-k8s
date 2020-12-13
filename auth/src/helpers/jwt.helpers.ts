import * as jwt from 'jsonwebtoken';

/**
 * Generate token
 * @param data array with user data
 * @return user token
 */
const generateToken = (data: {email: string, id: string}) => {
  return jwt.sign(data, process.env.JWT_KEY!);
}  

export { generateToken }