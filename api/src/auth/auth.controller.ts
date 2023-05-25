import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-detail.interface';
import { ExistingUserDTO } from 'src/user/dtos/existin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() user: NewUserDTO): Promise<UserDetails | string> {
    return await this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: ExistingUserDTO,
  ): Promise<{ token: string | null }> {
    return await this.authService.login(user);
  }
}
