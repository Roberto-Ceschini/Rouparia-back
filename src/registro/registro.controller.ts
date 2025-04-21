import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { AuthJwtRole } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('registro')
@AuthJwtRole()
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  @Roles(Role.Admin, Role.User)
  create(@Body() createRegistroDto: CreateRegistroDto) {
    return this.registroService.create(createRegistroDto);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  findAll() {
    return this.registroService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  findOne(@Param('id') id: string) {
    return this.registroService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateRegistroDto: UpdateRegistroDto) {
    return this.registroService.update(+id, updateRegistroDto);
  }

  @Delete('id/:id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.registroService.remove(+id);
  }

  @Delete('removeAll') // Exemplo de rota que chama o método deleteAll
  @Roles(Role.Admin)
  async removeAll() {
    return this.registroService.removeAll();
  }
}
