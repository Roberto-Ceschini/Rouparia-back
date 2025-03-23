import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsInt, IsNumber, IsBoolean } from "class-validator";

export class CreateColaboradorDto {

    @ApiProperty({ example: 1, description: "Número único do colaborador" })
    @IsInt()
    @IsNotEmpty()
    numero: number;

    @ApiProperty({ example: "Carlos Silva", description: "Nome do colaborador" })
    @IsString()
    @IsNotEmpty()
    nome: string;

    
    @ApiProperty({ example: true, description: "Se o colaborador esta ou nao pendente" })
    @IsBoolean()
    @IsOptional()
    pendente: boolean

    
    @ApiProperty({ example: 0, description: "Verifica se o colaborador esta pendendte" })
    @IsInt()
    @IsOptional()
    qtd_pendente: number;

    @ApiProperty({ example: 1, description: "ID da área do colaborador", required: false })
    @IsInt()
    @IsOptional()
    area_id?: number;

    @ApiProperty({ example: 1, description: "ID do vinculo do colaborador", required: false })
    @IsInt()
    @IsOptional()
    vinculo_id?: number;
}
