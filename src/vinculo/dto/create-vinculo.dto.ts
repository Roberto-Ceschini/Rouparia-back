import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVinculoDto {

    @ApiProperty({example: "Bolsista", description: "Vinculo do colaborador"})
    @IsString()
    @IsNotEmpty()
    nome: string;

}