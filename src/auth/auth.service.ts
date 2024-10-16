import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { signupDto } from './dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly httpService:HttpService
    ){}

    async signup(dto: signupDto){
        try{ 
            const res = await this.httpService.post("http://localhost:5002/api/user/", {...dto}).toPromise()
            return res.data
        }catch(e){
            console.log(e)
            if(e.response){
                throw new HttpException(e.response.data.message, e.response.data.statusCode)
            }
            throw new HttpException("server error auth", 500)
        }   
    }  
}
