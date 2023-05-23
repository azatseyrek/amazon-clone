import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-detail.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | string> {
    const { name, email, password } = user;

    const existingUser = this.userService.findByEmail(email);

    if (existingUser) return 'Email already exists';
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserDetails(newUser);
  }
}
