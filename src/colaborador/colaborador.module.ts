import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AreaService } from 'src/area/area.service';
import { VinculoService } from 'src/vinculo/vinculo.service';

@Module({
  controllers: [ColaboradorController],
  providers: [ColaboradorService, PrismaService, AreaService, VinculoService],
})
export class ColaboradorModule {}
