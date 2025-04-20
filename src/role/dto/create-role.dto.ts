import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Nome da role (papel/função)' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
