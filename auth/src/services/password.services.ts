import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

class Password {
  
  /**
   * 
   * @param {string} password cadena para aplicar hash
   * @returns {string} password encriptado
   */
  static async toHash(password: string){
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  /**
   * Compara el password almacenado con el entrante
   * 
   * @param {string} storedPassword 
   * @param {string} suppliedPassword 
   * @returns {boolean}
   */
  static async compare(storedPassword: string, suppliedPassword: string){
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }

}

export {Password}