import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { ColaboradorService } from 'src/colaborador/colaborador.service';

@Injectable()
export class RegistroService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly colaborador: ColaboradorService
  
  ) {}

  async create(createRegistroDto: CreateRegistroDto) {
    const colaborador = await this.colaborador.findOne(createRegistroDto.colaborador_id);
  
    // Se for o primeiro registro, permite qualquer ação
    if (colaborador.registros.length === 0) {
      return await this.criarRegistro(createRegistroDto);
    }
  
    // Calcula o total entregue e o total já retirado
    const totalEntregou = colaborador.registros
      .filter((r) => r.status === "entregou")
      .reduce((acc, r) => acc + r.quantidade, 0);
    const totalRetirou = colaborador.registros
      .filter((r) => r.status === "retirou")
      .reduce((acc, r) => acc + r.quantidade, 0);
  
    // Se o novo registro for de retirada, verifica a regra
    if (createRegistroDto.status === "retirou") {
      // Garante que a retirada não ultrapasse a entrega
      if (totalRetirou - totalEntregou !== 0){
        if (totalRetirou + createRegistroDto.quantidade > totalEntregou) {
          return { message: "error", data: { totalEntregou, totalRetirou } };
        }
    }
    }
  
    return await this.criarRegistro(createRegistroDto);
  }
  
  private async criarRegistro(createRegistroDto: CreateRegistroDto) {
    const dataAtual = new Date();
    const registroComData = {
      ...createRegistroDto,
      data: dataAtual,
    };
    await this.prisma.registro.create({ data: registroComData });
    return { message: "sucesso", data: null };
  }
  
  async findAll() {
    return await this.prisma.registro.findMany();
  }

  async findOne(id: number) {
    const registro = await this.prisma.registro.findUnique({ where: { id } });
    if (!registro) throw new NotFoundException(`Registro com ID ${id} não encontrado.`);
    return registro;
  }

  async update(id: number, updateRegistroDto: UpdateRegistroDto) {
    await this.findOne(id); // Verifica se existe
    return await this.prisma.registro.update({ where: { id }, data: updateRegistroDto });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe
    const deletar = await this.prisma.registro.delete({ where: { id } });
    return `Produto com id ${id} removido com sucesso`
  }

  // Deletar todos os registros
  async removeAll() {
    await this.prisma.registro.deleteMany({});
    return { message: 'Todos os registros foram excluídos com sucesso.' };
  }
  
}
