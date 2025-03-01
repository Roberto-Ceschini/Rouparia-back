import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RegistroController],
  providers: [RegistroService, PrismaService],
})
export class RegistroModule {}
