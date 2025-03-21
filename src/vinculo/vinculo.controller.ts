import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VinculoService } from './vinculo.service';
import { CreateVinculoDto } from './dto/create-vinculo.dto';
import { UpdateVinculoDto } from './dto/update-vinculo.dto';

@Controller('vinculo')
export class VinculoController {
  constructor(private readonly vinculoService: VinculoService) {}

  @Post()
  create(@Body() createVinculoDto: CreateVinculoDto) {
    return this.vinculoService.create(createVinculoDto);
  }

  @Get()
  findAll() {
    return this.vinculoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vinculoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVinculoDto: UpdateVinculoDto) {
    return this.vinculoService.update(+id, updateVinculoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vinculoService.remove(+id);
  }
}
