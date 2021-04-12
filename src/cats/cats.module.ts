import { Module, Logger } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [SharedModule],
    controllers: [CatsController],
    providers: [Logger, CatsService],
})
export class CatsModule {}
