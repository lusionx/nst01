websocket 实践
===================

### svc验证
网关实现`OnGatewayConnection`接口, 可以处理在连接时的验证, 将非法 conn 提前拒绝
```
handleConnection(cli: WebSocket, req: IncomingMessage)
```
