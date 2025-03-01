import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { AreaModule } from './area/area.module';
import { RegistroModule } from './registro/registro.module';
import { AdminModule } from './admin/admin.module';
import { FuncionarioRoupariaModule } from './funcionario_rouparia/funcionario_rouparia.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ColaboradorModule, AreaModule, RegistroModule, AdminModule, FuncionarioRoupariaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
