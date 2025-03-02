import { Role } from "src/common/enums/role.enum";

export class FuncionarioRouparia {
    roles: Role[];

    constructor(roles: Role[] = [Role.User]) { 
        this.roles = roles; // Pode receber mais roles se necessário
    }
}
