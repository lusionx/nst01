/**
 * 只引入有controller 的 module
 */

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { EventsModule } from './events/events.module';
import { ChanMiddleware } from './shared/chan.middleware';

@Module({
    imports: [CatsModule, DogsModule, EventsModule],
})
export class AppModule implements NestModule {
    configure(chan: MiddlewareConsumer) {
        // 即使 url, 无法符合 controll, 也会执行; 只能基于路由配置
        chan.apply(ChanMiddleware).forRoutes('*');
    }
}
