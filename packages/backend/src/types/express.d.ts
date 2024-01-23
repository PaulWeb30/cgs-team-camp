import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/entities/User.entity';

// express.d.ts
declare global {
  namespace Express {
    interface Request {
      email: string | JwtPayload;
      entity: User;
      [key: string]: any;
    }
  }
}

export {};
