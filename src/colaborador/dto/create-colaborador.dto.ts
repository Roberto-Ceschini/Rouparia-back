import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";

export class CreateColaboradorDto {

    @ApiProperty({ example: "001", description: "Número único do colaborador" })
    @IsString()
    @IsNotEmpty()
    numero: string;

    @ApiProperty({ example: "Carlos Silva", description: "Nome do colaborador" })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ example: 1, description: "ID da área do colaborador", required: false })
    @IsInt()
    @IsOptional()
    area_id?: number;
}
