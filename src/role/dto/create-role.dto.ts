import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({
        description: 'Nome da role',
        example: 'Admin',
        required: false,
      })
      @IsString()
      role: string;
}
