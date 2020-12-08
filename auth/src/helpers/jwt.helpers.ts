import * as jwt from 'jsonwebtoken';
import config from "../config/index";

const generateToken = (data: {email: string, id: string}) => {
  return jwt.sign(data, config.JWT_KEY);
}  

export { generateToken }