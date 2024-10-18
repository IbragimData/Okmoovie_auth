import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { options } from './config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({
    isGlobal: true
  }), JwtModule.registerAsync(options())],
  providers: [AuthService, PrismaService],
  controllers: [AuthController]
})
export class AuthModule {}
