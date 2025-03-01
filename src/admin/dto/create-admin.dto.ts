import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do administrador' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'admin@example.com', description: 'Email do administrador', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do administrador' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

