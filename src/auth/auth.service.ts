
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
) {}

  async signIn(createAuthDto: CreateAuthDto){

    const user = await this.adminService.findByemail(createAuthDto.email);
    const pass = createAuthDto.password;

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.nome};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
