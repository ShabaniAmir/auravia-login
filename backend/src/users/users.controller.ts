import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getUser(@Param("id") id: string) {
        return this.usersService.toSafeObject(await this.usersService.user({ id }));
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    async getUsers() {
        const users = await this.usersService.users({});

        return await this.usersService.manyToSafeObject(users);
    }

    @Post("")
    async createUser(
        @Body() userDto: UserDto
    ) {
        const { email, password } = userDto;
        try {
            return this.usersService.toSafeObject(await this.usersService.createUser({
                email,
                password,
            }));
        }
        catch (e) {
            if (e.code === "P2002" && e.meta.target.includes("email")) {
                throw new HttpException("Email already in use", HttpStatus.BAD_REQUEST);
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateUser(
        @Body() userDto: UserDto,
        @Param("id") id: string
    ) {
        const { email, password } = userDto;
        return this.usersService.toSafeObject(await this.usersService.updateUser({
            where: { id },
            data: { email, password },
        }));
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return this.usersService.toSafeObject(await this.usersService.deleteUser({ id }));
    }
}
