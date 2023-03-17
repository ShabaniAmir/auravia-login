import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Post("login")
    async login(
        @Body() userDto: UserDto
    ) {
        const { email, password } = userDto;
        const token = await this.authService.login(email, password);
        return token;
    }

    @Post("register")
    async register(
        @Body() userDto: UserDto
    ) {
        const { email, password } = userDto;
        const user = await this.usersService.createUser({
            email,
            password
        });
        const token = await this.authService.login(email, password);
        return {
            user,
            token
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async me(@Request() req) {
        return req.user;
    }


}
