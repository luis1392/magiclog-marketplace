import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.generateJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: { email },
        select: { password: true, email: true, id: true, roles: true },
      });
      if (!user) {
        throw new UnauthorizedException('Credentials are not valid');
      }
      if (!(await bcrypt.compareSync(password, user.password))) {
        throw new UnauthorizedException('Credentials are not valid');
      }
      delete user.password;
      return {
        ...user,
        token: this.generateJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    try {
      const users = this.userRepository.find({
        where: { isActive: true },
      });
      return users;
    } catch (error) {
      this.handleError(error);
    }
  }

  private generateJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }

  /**
   *
   * @param error
   * @description Handle errors and throw appropriate exceptions
   * @private
   * @throws BadRequestException if the error code is 23505 (unique constraint violation)
   */
  private handleError(error: any): never {
    this.logger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    if (error.status === 401) {
      throw new UnauthorizedException(error);
    } else {
      throw new InternalServerErrorException(
        'An error occurred while processing your request',
        error.detail,
      );
    }
  }
}
