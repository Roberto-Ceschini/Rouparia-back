import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar uma nova role
  async create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  // Encontrar todas as roles
  async findAll() {
    return this.prisma.role.findMany({
      include: {
        admins: true,
        users: true,
      },
    });
  }

  // Encontrar uma role pelo ID
  async findOne(id: number) {
    return this.prisma.role.findUnique({
      where: { id },
      include: {
        admins: true,
        users: true,
      },
    });
  }

  // Atualizar uma role existente
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.prisma.role.update({ where: { id }, data: updateRoleDto })
  }

  // Remover uma role pelo ID
  async remove(id: number) {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  // Remover todas as roles
  async removeAll() {
    return this.prisma.role.deleteMany({});
  }
}
