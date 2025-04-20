import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email do useristrador', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do useristrador' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: [1, 2], description: 'IDs dos papéis atribuídos ao usuário' })
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  roles: number[];
}

