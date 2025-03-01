import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionarioRoupariaDto } from './create-funcionario_rouparia.dto';

export class UpdateFuncionarioRoupariaDto extends PartialType(CreateFuncionarioRoupariaDto) {}
