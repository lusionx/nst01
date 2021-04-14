import { IncomingMessage } from 'http';
import { Request } from 'express';
import { AppUserStore } from 'src/store/app-user.service';

export type OrigExpRequest = Request;

/**
 * 半类型化的 express.Request
 */
export interface ExpRequest extends IncomingMessage {
    get(name: 'set-cookie'): string[] | undefined;
    get(name: string): string | undefined;

    header(name: 'set-cookie'): string[] | undefined;
    header(name: string): string | undefined;

    ip: string;
    ips: string[];

    originalUrl: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PUTCH' | 'HEAD';
    baseUrl: string;

    query: any;

    /** 在 chan.middleware 里构建
     * scope: request 的数据空间
     */
    space: ChanSpace;
}

export class ChanSpace {
    public session: AppUserStore;
}
