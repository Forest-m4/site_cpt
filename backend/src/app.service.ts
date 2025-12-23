import { Injectable } from '@nestjs/common';
import { db } from './lib/db';

@Injectable()
export class AppService {
  async testDb(): Promise<any[]> {
    const result = await db.execute('SELECT 1');
    return result;
  }
}
