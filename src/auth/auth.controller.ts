import { Body, Controller, Post } from '@nestjs/common';
import { signupDto } from './dto';
import { AuthService } from './auth.service';

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
    login(@Body() dto:signupDto){
        return this.authService.login(dto)
    }
}
