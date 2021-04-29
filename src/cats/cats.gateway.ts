/** 功能类似 controller, 但需要放在 provider 里
 * WebSocketGateway 默认使用 http 的相同端口
 * SubscribeMessage 需要配合 前端的 socket.send(JSON.stringify({ event: 'events', data: 'test' }))
 * 用 this.server.clients 查找非本 client
 */

import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';
import WebSocket, { Server } from 'ws';

@WebSocketGateway()
export class CatsGateway implements OnGatewayConnection {
    constructor(public logger: Logger) {
        const _fn = async () => {
            if (this.server) {
                this.logger.debug(
                    'server.clients.size' + this.server.clients.size.toString(),
                );
            }
            setTimeout(_fn, 2000);
        };
        _fn();
    }

    handleConnection(cli: WebSocket, req: IncomingMessage) {
        if (!req.url) return cli.terminate();
        console.log(req.url);
        if (req.url.includes('0.9')) {
            return cli.terminate();
        }
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('events')
    onEvent(
        @ConnectedSocket() client: WebSocket,
        @MessageBody() data: any,
    ): Rx.Observable<WsResponse<number>> {
        for (const s of this.server.clients) {
            // 当需要串 client 发消息时
            console.log(s === client);
        }
        return Rx.from([1, 2, 3]).pipe(
            map((item) => ({ event: 'events', data: item })),
        );
    }
}
