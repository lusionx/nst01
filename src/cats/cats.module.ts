import { Module, Logger } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '../store/store.module';
import { CatsGateway } from './cats.gateway';

@Module({
    imports: [SharedModule, StoreModule],
    controllers: [CatsController],
    providers: [Logger, CatsService, CatsGateway],
})
export class CatsModule {}
