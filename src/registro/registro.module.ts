import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { Colaborador } from 'src/colaborador/entities/colaborador.entity';
import { ColaboradorService } from 'src/colaborador/colaborador.service';
import { Area } from 'src/area/entities/area.entity';
import { AreaService } from 'src/area/area.service';
import { VinculoService } from 'src/vinculo/vinculo.service';

@Module({
  controllers: [RegistroController],
  providers: [RegistroService, PrismaService, ColaboradorService, AreaService, VinculoService],
})
export class RegistroModule {}
