import { applyDecorators, UseGuards } from "@nestjs/common";
import { ValidRoles } from "../enums/roles.enum";
import { RoleProtected } from "./role-protected/role-protected.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";

export function Auth(...roles: ValidRoles[]){
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(JwtAuthGuard, UserRoleGuard)
    )
}