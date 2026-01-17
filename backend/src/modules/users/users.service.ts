import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as bcrypt from 'bcrypt';
import { users } from '../../lib/infrastructure/db/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { eq } from 'drizzle-orm';

export type UserEntity = typeof users.$inferSelect;

export type UserRole = 'reader' | 'author';

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle('DB') private readonly db: NodePgDatabase) {}

  async create(dto: CreateUserDto & { role?: UserRole }): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const [user] = await this.db
      .insert(users)
      .values({
        email: dto.email,
        password: hashedPassword,
        role: dto.role ?? 'reader',
      })
      .returning();

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user[0];
  }

  async findById(id: number): Promise<UserEntity> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(
    id: number,
    data: Partial<Omit<UserEntity, 'id'>>,
  ): Promise<UserEntity> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const [user] = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(id: number): Promise<void> {
    const result = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!result.length) {
      throw new NotFoundException('User not found');
    }
  }

  async findAll(limit = 10, offset = 0): Promise<UserEntity[]> {
    return await this.db.select().from(users).limit(limit).offset(offset);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
