/**
 * 提供一个 req 级的空间, 在 guard pipe 之间共享数据
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ChanSpace } from 'src/common/interfaces/request';

import { reqChan } from '../consts';

@Injectable()
export class ChanMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        req[reqChan] = new ChanSpace();

        Object.defineProperty(req, 'space', {
            get: () => {
                return req[reqChan];
            },
        });
        next();
    }
}
