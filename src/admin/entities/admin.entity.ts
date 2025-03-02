import { Role } from "src/common/enums/role.enum";

export class Admin {
    roles: Role[];

    constructor(roles: Role[] = [Role.Admin]) { 
        this.roles = roles; // Pode receber mais roles se necessário
    }
}
