import 'express';
import { IGunInstance } from 'gun';

declare global {
  namespace Express {
    interface Application {
      port?: number;
      gun: IGunInstance<any>;
    }
  }
}