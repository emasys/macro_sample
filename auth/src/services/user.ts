import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class UserService {
  static async toHash(value: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(value, salt, 8)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }
  static async compare(storedValue: string, suppliedValue: string) {
      const [hashedValue, salt] = storedValue.split('.');
      const buf = (await scryptAsync(suppliedValue, salt, 8)) as Buffer;
      return buf.toString('hex') === hashedValue;
  }
}
