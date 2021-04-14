import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExpRequest } from '../interfaces/request';

const KEY = 'roles';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this._reflector.get<string[]>(KEY, context.getHandler());

        if (!roles) return false;

        const req = context.switchToHttp().getRequest<ExpRequest>();
        console.log(req.space);
        const { session } = req.space;
        if (!session) return false;
        if (roles.includes(session.role)) return true;

        throw new NotFoundException();
    }
}

export const SetRoles = (...roles: string[]) => SetMetadata(KEY, roles);
