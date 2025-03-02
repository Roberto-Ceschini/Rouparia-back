import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '15d' },
    }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
