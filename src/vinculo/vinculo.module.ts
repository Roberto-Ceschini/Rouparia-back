import { Module } from '@nestjs/common';
import { VinculoService } from './vinculo.service';
import { VinculoController } from './vinculo.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VinculoController],
  providers: [VinculoService, PrismaService],
})
export class VinculoModule {}
