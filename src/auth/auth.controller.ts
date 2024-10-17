import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { signupDto } from './dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}
    @Post("signup")
    signup(@Body() dto:signupDto){
        return this.authService.signup(dto)
    }    
    @Post("login")
    async login(@Body() dto:signupDto, @Res() res:Response, @Req() req:Request){
        const userAgent = req.headers['user-agent']
        const token = await this.authService.login(dto, userAgent, req)
        res.cookie("token", token.jwt, {httpOnly:true})
        res.send(token)
    }
}
