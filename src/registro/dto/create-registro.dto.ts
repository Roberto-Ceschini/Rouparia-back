import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsDate } from "class-validator";

export class CreateRegistroDto {
    // @ApiProperty({ example: "2025-03-01T12:00:00Z", description: "Data do registro" })
    // @IsDate()
    // data: Date;

    @ApiProperty({ example: "retirou", description: "Status do registro ('entregou' ou 'retirou')" })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({ example: 1, description: "ID do colaborador associado ao registro" })
    @IsInt()
    @IsNotEmpty()
    colaborador_id: number;
}
