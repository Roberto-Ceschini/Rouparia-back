import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "../roles/roles.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";
import { jwtAuthGuard } from "../guards/jwt.authGuard";
import { RolesGuard } from "../guards/roles.guard";
import { Role } from "src/enums/role.enum";

export function Auth(...roles: Role[]) {
    return applyDecorators(
      UseGuards(jwtAuthGuard, RolesGuard),
      Roles(...roles),
      ApiBearerAuth('access-token'),
    );
  }