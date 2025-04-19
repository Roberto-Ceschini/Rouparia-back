import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local.authGuard';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(localAuthGuard)
    @Post('login')
    @ApiBody({ type: LoginDto }) // Mostra os campos no Swagger
    login(@Request() req) {
      return this.authService.login(req.user);
    }
}
