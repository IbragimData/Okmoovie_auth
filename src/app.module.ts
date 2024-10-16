import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HttpModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
