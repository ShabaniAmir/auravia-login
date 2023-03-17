import { LocalAuthGuard } from './auth/local-auth.guard';
import { Body, Controller, Get, Post, Put, Delete, Patch, Param, HttpStatus, HttpException, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users/users.service';


@Controller()
export class AppController {
    constructor(private usersService: UsersService) { }

}

