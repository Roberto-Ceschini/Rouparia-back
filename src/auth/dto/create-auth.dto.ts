import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {

    @ApiProperty({ example: 'email@email.com', description: 'Email do administrador' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '1234', description: 'Senha do administrador' })
    @IsString()
    @IsNotEmpty()
    password: string;
}