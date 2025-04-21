import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class localAuthGuard extends AuthGuard('local'){
    canActivate(context: ExecutionContext){
        return super.canActivate(context)
    }
}