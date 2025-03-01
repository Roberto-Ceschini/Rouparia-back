import { Module } from '@nestjs/common';
import { FuncionarioRoupariaService } from './funcionario_rouparia.service';
import { FuncionarioRoupariaController } from './funcionario_rouparia.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FuncionarioRoupariaController],
  providers: [FuncionarioRoupariaService, PrismaService],
})
export class FuncionarioRoupariaModule {}
