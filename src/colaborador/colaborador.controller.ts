import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, StreamableFile, Header, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { jwtAuthGuard } from 'src/auth/guards/jwt.authGuard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('colaborador')
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() createColaboradorDto: CreateColaboradorDto) {
    return this.colaboradorService.create(createColaboradorDto);
  }

  @Get()
  findAll() {
    return this.colaboradorService.findAll();
  }

  @Get('gerarExcel')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=colaboradores_pendentes.xlsx')
  async gerarExcel() {
    const fileBuffer = await this.colaboradorService.gerarExcel();
    return new StreamableFile(fileBuffer);
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

  @Get('pendentes')
  findAllPendentesPaginados(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.colaboradorService.findAllPendentesPaginados(
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

  @Delete()
  removeAll(){
    return this.colaboradorService.removeAll();
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
