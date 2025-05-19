import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { GetUser } from './decorators/get-user.decorators';
import { User } from './entities/user.entity';

import { Auth } from './decorators/auth.decorators';
import { ValidRoles } from 'src/common/interfaces/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   *
   * @param createAuthDto
   * @returns JWT token
   * This endpoint is used to create a new user account.
   */
  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  /**
   *
   * @param createUserDto
   * @returns JWT token
   */
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('users')
  @Auth(ValidRoles.admin)
  findAll(@GetUser() user: User) {
    return user;
    //return this.authService.findAll();
  }
}
