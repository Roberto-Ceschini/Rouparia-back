
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,    
) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log("Validando")
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      console.log("Resultado validacao", result);
      return result;
    }
    return null;
  }

  async login (user: any){
    console.log("Logando")
    console.log("userROLAS", user.roles[0].role)
    const payload = ({id: user.id, username: user.username, roles: user.roles[0].role});
    console.log("PAYLOAD GERADO", payload)
    const jwtToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15d'
    })
    return {
        acess_token: jwtToken
    }
  }
}