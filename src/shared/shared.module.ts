import { Logger, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { RedisService } from './redis.service';

@Module({
    providers: [ConfigService, RedisService, Logger],
    exports: [ConfigService, RedisService],
})
export class SharedModule {}
