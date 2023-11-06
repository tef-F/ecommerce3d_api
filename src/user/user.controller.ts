/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    me(@Req() request) {
        return request.user;
    }
}
