import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDto, signupDto } from './dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { compareSync } from 'bcrypt';
import { addMonths } from 'date-fns';

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

    async login(dto:loginDto){
        try{
            const res = await this.httpService.get("http://localhost:5002/api/user/" + dto.mail).toPromise()
            console.log(!res.data)
            if(!res.data){
                throw new BadRequestException()
            }
            console.log(compareSync(dto.password, res.data.password))
            if(compareSync(dto.password, res.data.password)){
                throw  new BadRequestException()
            }
            return res.data
        }catch(e){
            console.log(e)
            if(e.response){
                throw new HttpException(e.response.message, e.response.statusCode)
            }
            throw new HttpException("server error auth", 500)
        }
    }
}
