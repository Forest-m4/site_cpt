import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private idCounter = 1;

  create(data: { email: string; password: string; role?: UserRole }): User {
    const user: User = {
      id: this.idCounter++,
      email: data.email,
      password: data.password,
      role: data.role ?? UserRole.READER,
    };

    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  findById(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
