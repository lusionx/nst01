/**
 * 守卫不该太复杂
 * 应该做低 io 的判断
 * - token
 * - jwt
 * - ip 限流
 *
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppUserService } from 'src/store/app-user.service';
import { ExpRequest } from '../interfaces/request';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<ExpRequest>();

        const token = req.header('x-auth-token') || req.query['token'];
        if (!token) return false;
        const user = await AppUserService.single(token | 0);
        if (!user) return false;
        req.space.session = user;

        return true;
    }
}