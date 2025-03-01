import { Injectable } from '@nestjs/common';
import { CreateFuncionarioRoupariaDto } from './dto/create-funcionario_rouparia.dto';
import { UpdateFuncionarioRoupariaDto } from './dto/update-funcionario_rouparia.dto';

@Injectable()
export class FuncionarioRoupariaService {
  create(createFuncionarioRoupariaDto: CreateFuncionarioRoupariaDto) {
    return 'This action adds a new funcionarioRouparia';
  }

  findAll() {
    return `This action returns all funcionarioRouparia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} funcionarioRouparia`;
  }

  update(id: number, updateFuncionarioRoupariaDto: UpdateFuncionarioRoupariaDto) {
    return `This action updates a #${id} funcionarioRouparia`;
  }

  remove(id: number) {
    return `This action removes a #${id} funcionarioRouparia`;
  }
}
