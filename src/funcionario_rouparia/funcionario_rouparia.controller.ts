import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionarioRoupariaService } from './funcionario_rouparia.service';
import { CreateFuncionarioRoupariaDto } from './dto/create-funcionario_rouparia.dto';
import { UpdateFuncionarioRoupariaDto } from './dto/update-funcionario_rouparia.dto';

@Controller('funcionario-rouparia')
export class FuncionarioRoupariaController {
  constructor(private readonly funcionarioRoupariaService: FuncionarioRoupariaService) {}

  @Post()
  create(@Body() createFuncionarioRoupariaDto: CreateFuncionarioRoupariaDto) {
    return this.funcionarioRoupariaService.create(createFuncionarioRoupariaDto);
  }

  @Get()
  findAll() {
    return this.funcionarioRoupariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionarioRoupariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuncionarioRoupariaDto: UpdateFuncionarioRoupariaDto) {
    return this.funcionarioRoupariaService.update(+id, updateFuncionarioRoupariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionarioRoupariaService.remove(+id);
  }
}
