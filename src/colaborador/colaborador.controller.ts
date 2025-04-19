import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, StreamableFile, Header, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { jwtAuthGuard } from 'src/auth/guards/jwt.authGuard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthJwtRole } from 'src/auth/decorators/auth.decorator';

@Controller('colaborador')
@AuthJwtRole()
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) { }

  @Post()
  @Roles(Role.Admin)
  create(@Body() createColaboradorDto: CreateColaboradorDto) {
    return this.colaboradorService.create(createColaboradorDto);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  findAll() {
    return this.colaboradorService.findAll();
  }

  @Get('gerarExcel')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=colaboradores_pendentes.xlsx')
  @Roles(Role.Admin, Role.User)
  async gerarExcel() {
    const fileBuffer = await this.colaboradorService.gerarExcel();
    return new StreamableFile(fileBuffer);
  }


  @Get('numero/:numero')
  @Roles(Role.Admin, Role.User)
  findByNumero(@Param('numero') numero: string) {
    return this.colaboradorService.findByNumero(+numero);
  }

  @Get('registros/:id')
  @Roles(Role.Admin, Role.User)
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
  @Roles(Role.Admin, Role.User)
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
  @Roles(Role.Admin, Role.User)
  findOne(@Param('id') id: string) {
    return this.colaboradorService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateColaboradorDto: UpdateColaboradorDto) {
    return this.colaboradorService.update(+id, updateColaboradorDto);
  }

  @Delete()
  @Roles(Role.Admin)
  removeAll() {
    return this.colaboradorService.removeAll();
  }

  @Delete('id/:id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.colaboradorService.remove(+id);
  }

  @Delete('numero/:numero')
  @Roles(Role.Admin)
  removeByNumero(@Param('numero') numero: string) {
    return this.colaboradorService.removeByNumero(+numero);
  }
}
