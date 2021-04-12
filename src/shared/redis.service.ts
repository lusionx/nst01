import { Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';
import { ConfigService } from './config.service';

@Injectable()
export class RedisService {
    client: RedisClient;

    constructor(config: ConfigService) {
        console.log('redis', config.redis());
        this.client = new RedisClient({ url: config.redis() });
    }

    get(k: string): Promise<string> {
        const { client } = this;
        return new Promise<string>((res, rej) => {
            client.GET(k, (err, reply) => {
                err ? rej(err) : res(reply || '');
            });
        });
    }

    set(k: string, v: string, ss: number): Promise<'OK' | undefined> {
        const { client } = this;
        return new Promise<'OK' | undefined>((res, rej) => {
            client.SET(k, v, 'EX', ss, (err, reply) => {
                err ? rej(err) : res(reply);
            });
        });
    }
}
