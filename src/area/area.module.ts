import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AreaController],
  providers: [AreaService, PrismaService],
  exports: [AreaService]
})
export class AreaModule {}
