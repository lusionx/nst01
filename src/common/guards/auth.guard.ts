/**
 * 守卫不该太复杂
 * 应该做低 io 的判断
 * - token
 * - jwt
 * - ip 限流
 * ---------------------
 * 当返回 false 时默认按 403 处理
 * 也可以直接抛异常干预响应
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppUserService } from 'src/store/app-user.service';
import { ExpRequest } from '../interfaces/request';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected model: AppUserService) {}
    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        // 源码 packages/coxre/helpers/execution-context-host.ts
        // 不能 switch 错
        if (ctx.getType() === 'ws') {
            return this.can4Ws(ctx);
        } else if (ctx.getType() === 'http') {
            return this.can4Http(ctx);
        }
        return false;
    }

    async can4Http(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<ExpRequest>();
        const token = req.header('x-auth-token') || req.query['token'];
        if (!token) return false;
        const user = await this.model.single(token | 0);
        if (!user) return false;
        req.space.session = user;
        return true;
    }

    async can4Ws(context: ExecutionContext): Promise<boolean> {
        const cli = context.switchToWs().getClient<WebSocket>();
        return Boolean(cli);
    }
}
