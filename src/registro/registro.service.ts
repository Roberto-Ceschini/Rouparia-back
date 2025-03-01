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
    const ultimoRegistro = colaborador.registros[colaborador.registros.length - 1] ?? "Nao ha";
    // console.log("Ultimo registro cliente\n", ultimoRegistro);
    // console.log("Registrando", createRegistroDto.status);
    if (ultimoRegistro.status === "retirou" && createRegistroDto.status === "retirou"){
       return ({message: "error", data: ultimoRegistro.data})
    }else {
    const dataAtual = new Date();

    const registroComData = {
      ...createRegistroDto,
      data: dataAtual, 
    };
    const criarRegistro =  await this.prisma.registro.create({ data: registroComData });
    return ({message: "sucesso", data: null});
  }
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
