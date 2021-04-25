/** 功能类似 controller, 但需要放在 provider 里
 * WebSocketGateway 默认使用 http 的相同端口
 * SubscribeMessage 需要配合 前端的 socket.send(JSON.stringify({ event: 'events', data: 'test' }))
 * 用 this.server.clients 查找非本 client
 */

import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import WebSocket, { Server } from 'ws';

@WebSocketGateway()
export class CatsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('events')
    onEvent(client: WebSocket, data: any): Observable<WsResponse<number>> {
        for (const s of this.server.clients) {
            // 当需要串 client 发消息时
            console.log(s === client);
        }
        console.log(client.terminate);
        client.pong();
        console.log(data);
        return from([1, 2, 3]).pipe(
            map((item) => ({ event: 'events', data: item })),
        );
    }
}
