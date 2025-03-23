import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { ColaboradorService } from 'src/colaborador/colaborador.service';
import { Colaborador } from '@prisma/client';

@Injectable()
export class RegistroService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly colaborador: ColaboradorService
  
  ) {}

  async create(createRegistroDto: CreateRegistroDto) {
    const colaborador = await this.colaborador.findOne(createRegistroDto.colaborador_id);
    const qtd_pendente = colaborador.qtd_pendente;
  
    // Se for o primeiro registro ou for uma entrega extra, permite qualquer ação
    if (colaborador.registros.length === 0 || createRegistroDto.status === 'entrega extra') {
      if (createRegistroDto.status === 'retirou'){
        // Marca como pendente e atualiza a quantidade pendente
      await this.colaborador.update(createRegistroDto.colaborador_id, {
        qtd_pendente: createRegistroDto.quantidade
      })
      }
      return await this.criarRegistro(createRegistroDto);
    }
  
    // Filtra os registros para pegar apenas os válidos (retirou ou entregou)
    const registrosValidos = colaborador.registros.filter(r => r.status === "retirou" || r.status === "entregou");

    // Pegamos o último registro Válido desse colaborador
    const ultimoRegistro = registrosValidos[registrosValidos.length - 1];
  
    // Impede duas entregas consecutivas
    if (ultimoRegistro.status === "entregou" && createRegistroDto.status === "entregou") {
      return {
        message: "error", //não é possível realizar duas entregas seguidas, verifique se deseja uma entrega extra.
        code: 1
      };
    }    
  
    // Se o novo registro for uma retirada, ele só pode retirar se não houver pendência
    if (createRegistroDto.status === "retirou") {
      console.log("QUANTIDADE PENDENTE", qtd_pendente);
      if (qtd_pendente !== 0) {
        return {
          message: "error", //Colaborador possui pendencias
          code: 2,
          data: { pendecias: qtd_pendente }
        };
      }else{
       // Marca como pendente e atualiza a quantidade pendente
      await this.colaborador.update(createRegistroDto.colaborador_id, {
        qtd_pendente: createRegistroDto.quantidade
      })
    }
  }
  
    // Se o novo registro for uma entrega, ela deve corresponder exatamente à última retirada pendente
    if (createRegistroDto.status === "entregou") {
      const retiradas = registrosValidos.filter(r => r.status === "retirou");
      const ultimaRetirada = retiradas[retiradas.length - 1];
  
      if (!ultimaRetirada || createRegistroDto.quantidade !== ultimaRetirada.quantidade) {
        return {
          message: "error", //- a entrega deve ser exatamente igual à última retirada pendente.
          code: 3,
          data: {
            quantidadeEsperada: ultimaRetirada?.quantidade || 0,
            quantidadeRecebida: createRegistroDto.quantidade
          }
        };
      }else{
        await this.colaborador.update(createRegistroDto.colaborador_id, {
          qtd_pendente: 0
        })
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
