import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAreaDto {

    @ApiProperty({example: "Produção", description: "Area do colaborador"})
    @IsString()
    @IsNotEmpty()
    nome: string;

}
