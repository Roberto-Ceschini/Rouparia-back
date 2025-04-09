import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { AreaService } from 'src/area/area.service';
import { Colaborador } from './entities/colaborador.entity';

@Injectable()
export class ColaboradorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly area: AreaService
  ) { }

  async create(createColaboradorDto: CreateColaboradorDto) {
    if (createColaboradorDto.area_id) await this.area.findOne(createColaboradorDto.area_id); // verifica se area passada existe
    const colaborador = await this.prisma.colaborador.create({ data: createColaboradorDto });
    return colaborador;
  }

  async findAll() {
    return await this.prisma.colaborador.findMany({ select: {
      id: true,
      nome: true,
      numero: true,
      qtd_pendente: true,
      area: { select: { nome: true } },
      vinculo: { select: { nome: true } },
      registros: true,
    } });
  }

  async findOne(id: number) {
    const colaborador = await this.prisma.colaborador.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        numero: true,
        qtd_pendente: true,
        area: { select: { nome: true } },
        vinculo: { select: { nome: true } },
        registros: {
          select: {
            id: true,
            data: true,
            status: true,
            quantidade: true,
          },
          orderBy: {
            data: 'desc', // pega os mais recentes primeiro
          },
        },
      }
    });
    if (!colaborador) throw new NotFoundException(`Colaborador com ID ${id} não encontrado.`);
    return colaborador;
  }

  //FindoOne usado no service de registros
  async findOneRegistros(id: number) {
    const colaborador = await this.prisma.colaborador.findUnique({
      where: { id },
      select: {
        qtd_pendente: true,
        registros: {
          select: {
            id: true,
            data: true,
            status: true,
            quantidade: true,
          },
        },
      }
    });
    if (!colaborador) throw new NotFoundException(`Colaborador com ID ${id} não encontrado.`);
    return colaborador;
  }

  async findByNumero(numero: number) {
    const colaborador = await this.prisma.colaborador.findUnique({
      where: { numero },
      select: {
        id: true,
        nome: true,
        numero: true,
        qtd_pendente: true,
        area: { select: { nome: true } },
        vinculo: { select: { nome: true } },
        registros: {
          select: {
            id: true,
            data: true,
            status: true,
            quantidade: true,
          },
          orderBy: {
            data: 'desc', // pega os mais recentes primeiro
          },
        },
      },
    });
  
    if (!colaborador) {
      throw new NotFoundException(`Colaborador com número ${numero} não encontrado.`);
    }
  
    // Filtra os registros para pegar apenas os válidos
    const registrosValidos = colaborador.registros.filter(
      (r) => r.status === "retirou" || r.status === "entregou",
    );
  
    const ultimoRegistro = registrosValidos[0] || null;
  
    // Monta a resposta substituindo registros por ultimoRegistro
    return {
      ...colaborador,
      registros: ultimoRegistro,
    };
  }
  

  async findRegistrosPaginados (id: number, page: number, limit: number) {
    const colaborador = await this.findOne(id);
    const registros = colaborador.registros;
    const total = registros.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedRegistros = registros.slice(start, end);
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = end < total;
    const hasPrevPage = start > 0;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;

    return {
      total,
      totalPages,
      currentPage: page,
      nextPage,
      prevPage,
      registros: paginatedRegistros
    };
  }

  async update(id: number, updateColaboradorDto: UpdateColaboradorDto) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.colaborador.update({ where: { id }, data: updateColaboradorDto });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.colaborador.delete({ where: { id } });
  }

  async removeByNumero(numero: number) {
    const colaborador = await this.findByNumero(numero);
    if (colaborador) await this.remove(colaborador.id);
    return `colaborador de numero ${numero} removido com sucesso!`
  }
}
