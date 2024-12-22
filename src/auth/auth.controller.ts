import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { signupDto } from './dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@Post('signup')
  //signup(@Body() dto: signupDto) {
  //  return this.authService.signup(dto);
  //}
  @Post('login')
  async login(
    @Body() dto: signupDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    console.log(dto);
    const userAgent = req.headers['user-agent'];
    const token = await this.authService.login(dto, userAgent);
    res.cookie('token', token.jwt, { httpOnly: true });
    res.send(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@Req() req: Request) {
    return req.user;
  }
}
