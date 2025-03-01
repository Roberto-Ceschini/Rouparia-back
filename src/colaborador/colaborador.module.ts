import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AreaService } from 'src/area/area.service';

@Module({
  controllers: [ColaboradorController],
  providers: [ColaboradorService, PrismaService, AreaService],
})
export class ColaboradorModule {}
