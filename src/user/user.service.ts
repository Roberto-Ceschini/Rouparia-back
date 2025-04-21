import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor (private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {

    const { roles, ...dadosUsuario } = createUserDto;
  
    return await this.prisma.user.create({
      data: {
        ...dadosUsuario,
        roles: {
          connect: roles.map((id) => ({ id })),
        },
        password: await bcrypt.hash(createUserDto.password, 10)
      },
    });
  }
  
  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        roles: true
      }
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id }, include:{
      roles: true
    } });
    if (!user) throw new NotFoundException(`User com ID ${id} não encontrado.`);
    return user;
  }

  
  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username }, include: {
      roles: true
    } });
    if (!user) throw new NotFoundException(`Usuário ${username} não encontrado.`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Garante que o user existe
  
    const { roles, ...dadosAtualizados } = updateUserDto;
  
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...dadosAtualizados,
        ...(roles && {
          roles: {
            set: roles.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.user.delete({ where: { id } });
  }
}
