import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';

@Controller('colaborador')
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  @Post()
  create(@Body() createColaboradorDto: CreateColaboradorDto) {
    return this.colaboradorService.create(createColaboradorDto);
  }

  @Get()
  findAll() {
    return this.colaboradorService.findAll();
  }

  
  @Get('numero/:numero')
  findByNumero(@Param('numero') numero: string) {
    return this.colaboradorService.findByNumero(+numero);
  }

  @Get('registros/:id')
  findRegistrosPaginados(
    @Param('id') id: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.colaboradorService.findRegistrosPaginados(
      +id,
      +page || 1,
      +limit || 10,
    );
  }


  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.colaboradorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColaboradorDto: UpdateColaboradorDto) {
    return this.colaboradorService.update(+id, updateColaboradorDto);
  }

  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.colaboradorService.remove(+id);
  }

  @Delete('numero/:numero')
  removeByNumero(@Param('numero') numero: string) {
    return this.colaboradorService.removeByNumero(+numero);
  }
}
