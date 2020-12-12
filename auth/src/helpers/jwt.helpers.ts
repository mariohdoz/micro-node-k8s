import * as jwt from 'jsonwebtoken';
import config from "../config/index";

/**
 * Generate token
 * @param data array with user data
 * @return user token
 */
const generateToken = (data: {email: string, id: string}) => {
  return jwt.sign(data, config.JWT_KEY);
}  

export { generateToken }