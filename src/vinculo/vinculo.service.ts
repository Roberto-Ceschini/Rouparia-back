import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVinculoDto } from './dto/create-vinculo.dto';
import { UpdateVinculoDto } from './dto/update-vinculo.dto';

@Injectable()
export class VinculoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVinculoDto: CreateVinculoDto) {
    return await this.prisma.vinculo.create({ data: createVinculoDto });
  }

  async findAll() {
    return await this.prisma.vinculo.findMany();
  }

  async findOne(id: number) {
    const vinculo = await this.prisma.vinculo.findUnique({ where: { id } });
    if (!vinculo) throw new NotFoundException(`Vínculo com ID ${id} não encontrado.`);
    return vinculo;
  }

  async update(id: number, updateVinculoDto: UpdateVinculoDto) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.vinculo.update({ where: { id }, data: updateVinculoDto });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.vinculo.delete({ where: { id } });
  }
}
