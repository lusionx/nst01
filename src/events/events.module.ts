import { Module } from '@nestjs/common';
import { CatsGateway } from './cats.gateway';

@Module({
    providers: [CatsGateway],
})
export class EventsModule {}
