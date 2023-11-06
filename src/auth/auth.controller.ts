/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Get, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController { 
    constructor(private authService: AuthService) {
        authService.doSomething();
    }

    @Post('register')
    register(@Body() body:AuthDTO) {
        return this.authService.register(body);
    }

    //POST: login
    @Post('login')
    login(@Body() body:AuthDTO) {
        return this.authService.login(body);
    }
}
