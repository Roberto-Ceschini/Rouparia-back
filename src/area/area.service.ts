import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAreaDto: CreateAreaDto) {
    return await this.prisma.area.create({ data: createAreaDto });
  }

  async findAll() {
    return await this.prisma.area.findMany();
  }

  async findOne(id: number) {
    const area = await this.prisma.area.findUnique({ where: { id } });
    if (!area) throw new NotFoundException(`Área com ID ${id} não encontrada.`);
    return area;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.area.update({ where: { id }, data: updateAreaDto });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.area.delete({ where: { id } });
  }
}
