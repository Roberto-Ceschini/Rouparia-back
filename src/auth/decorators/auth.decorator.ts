import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "../roles/roles.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";
import { jwtAuthGuard } from "../guards/jwt.authGuard";
import { RolesGuard } from "../guards/roles.guard";

export function AuthJwtRole() {
    return applyDecorators(
      UseGuards(jwtAuthGuard, RolesGuard),
      ApiBearerAuth('access-token'),
    );
  }