import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFuncionarioRoupariaDto } from './dto/create-funcionario_rouparia.dto';
import { UpdateFuncionarioRoupariaDto } from './dto/update-funcionario_rouparia.dto';

@Injectable()
export class FuncionarioRoupariaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFuncionarioRoupariaDto: CreateFuncionarioRoupariaDto) {
    return await this.prisma.funcionario_rouparia.create({ data: createFuncionarioRoupariaDto });
  }

  async findAll() {
    return await this.prisma.funcionario_rouparia.findMany();
  }

  async findOne(id: number) {
    const funcionario = await this.prisma.funcionario_rouparia.findUnique({ where: { id } });
    if (!funcionario) throw new NotFoundException(`Funcionário da rouparia com ID ${id} não encontrado.`);
    return funcionario;
  }

  async update(id: number, updateFuncionarioRoupariaDto: UpdateFuncionarioRoupariaDto) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.funcionario_rouparia.update({ where: { id }, data: updateFuncionarioRoupariaDto });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.funcionario_rouparia.delete({where: {id}});
  }
}