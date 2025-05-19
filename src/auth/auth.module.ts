import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]), // User entity is imported here
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    // JwtModule is imported here asynchronously to avoid circular dependency issues JWT_SECRET
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '7d' }, // Token expiration time
        };
      },
    }),
    CommonModule,
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule], // Exporting JwtStrategy and PassportModule to be used in other modules
})
export class AuthModule {}
