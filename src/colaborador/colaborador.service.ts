import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';

@Injectable()
export class ColaboradorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createColaboradorDto: CreateColaboradorDto) {
    return await this.prisma.colaborador.create({ data: createColaboradorDto });
  }

  async findAll() {
    return await this.prisma.colaborador.findMany({ include: { area: true, registros: true } });
  }

  async findOne(id: number) {
    const colaborador = await this.prisma.colaborador.findUnique({ where: { id }, include: { area: true, registros: true } });
    if (!colaborador) throw new NotFoundException(`Colaborador com ID ${id} não encontrado.`);
    return colaborador;
  }

  async update(id: number, updateColaboradorDto: UpdateColaboradorDto) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.colaborador.update({ where: { id }, data: updateColaboradorDto });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.colaborador.delete({ where: { id } });
  }
}
