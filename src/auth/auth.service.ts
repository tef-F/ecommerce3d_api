/*
https://docs.nestjs.com/providers#services
*/

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private PrismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService) {
    }
    doSomething() {
        console.log("Xin chào nest JS")
    }

    async register(authDTO: AuthDTO) {
        const hashedPassword = await argon.hash(authDTO.password);
        //Insert DB 
        try {
            const user = await this.PrismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword,
                    firstName: '',
                    lastName: '',
                    gender: 1,
                },
                select: {
                    id: true,
                    email: true,
                    gender: true,
                    phoneNumber: true,
                    createdAt: true,
                }
            })

            return {
                message: user ? `Đăng ký thành công` : `Đăng ký thất bại`,
                user: await this.signToJwtString(user.id, user.email),
            }
        } catch (error) {
            if (error.code == 'P2002') {
                throw new ForbiddenException('User with this email already exists');
            }
            return {
                error,
            }
        }
    }

    async login(authDTO: AuthDTO) {
        const user = await this.PrismaService.user.findUnique({
            where: {
                email: authDTO.email,
            }
        })
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        const passwordMatched = await argon.verify(user.hashedPassword, authDTO.password);
        if (!passwordMatched) {
            throw new ForbiddenException('Incorrect password');
        }
        delete user.hashedPassword;
        return await this.signToJwtString(user.id, user.email);
    }

    async signToJwtString(userId: string, email: string): Promise<{ accessToken: string }> {
        const payload = {
            sub: userId,
            email,
        }
        const jwtSecret = await this.jwtService.signAsync(payload, {
            expiresIn: '30m',
            secret: this.configService.get('JWT_SECRET')
        })

        return {
            accessToken: jwtSecret,
        }
    }
}
