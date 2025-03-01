import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsInt, IsNumber } from "class-validator";

export class CreateColaboradorDto {

    @ApiProperty({ example: 1, description: "Número único do colaborador" })
    @IsInt()
    @IsNotEmpty()
    numero: number;

    @ApiProperty({ example: "Carlos Silva", description: "Nome do colaborador" })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ example: 1, description: "ID da área do colaborador", required: false })
    @IsInt()
    @IsOptional()
    area_id?: number;
}
