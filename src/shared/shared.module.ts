import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { RedisService } from './redis.service';

@Module({
    providers: [ConfigService, RedisService],
    exports: [RedisService],
})
export class SharedModule {}
