import { Injectable } from '@nestjs/common';
import IORedis, { Redis } from 'ioredis';
import { ConfigService } from './config.service';

@Injectable()
export class RedisService {
    client: Redis;

    constructor(config: ConfigService) {
        this.client = new IORedis(config.redis);
    }

    async getJSON<T>(k: string): Promise<T | undefined> {
        const v = await this.client.get(k);
        if (v) {
            return JSON.parse(v) as T;
        }
    }
    async setEX(k: string, v: string, ss: number) {
        return this.client.set(k, v, 'EX', ss);
    }
}
