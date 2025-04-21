import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { AreaModule } from './area/area.module';
import { RegistroModule } from './registro/registro.module';
import { PrismaService } from './prisma/prisma.service';
import { VinculoModule } from './vinculo/vinculo.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [ColaboradorModule, AreaModule, RegistroModule, VinculoModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, LocalStrategy, JwtService, AuthService, UserService, JwtStrategy],
})
export class AppModule {}
