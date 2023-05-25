import { UserDetails } from './user-detail.interface';
import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDetails | null> {
    return this.UserService.findById(id);
  }
}
