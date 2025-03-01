import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor (private readonly prisma: PrismaService){}

  async create(createAdminDto: CreateAdminDto) {
    return await this.prisma.admin.create({data: createAdminDto}) ;
  }
  async findAll() {
    return await this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new NotFoundException(`Admin com ID ${id} não encontrado.`);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.admin.update({ where: { id }, data: updateAdminDto });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.admin.delete({ where: { id } });
  }
}
