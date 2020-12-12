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

/**
 * 
 * @param token token from user
 * @param key JWT key
 * @return payload
 */
const verify = (token: string, key: string) => {
  try {
    return jwt.verify(token, key);
  } catch (error) {
    return null;
  }
}

export { generateToken, verify }