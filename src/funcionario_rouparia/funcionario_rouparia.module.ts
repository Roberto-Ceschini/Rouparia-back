import { Module } from '@nestjs/common';
import { FuncionarioRoupariaService } from './funcionario_rouparia.service';
import { FuncionarioRoupariaController } from './funcionario_rouparia.controller';

@Module({
  controllers: [FuncionarioRoupariaController],
  providers: [FuncionarioRoupariaService],
})
export class FuncionarioRoupariaModule {}
