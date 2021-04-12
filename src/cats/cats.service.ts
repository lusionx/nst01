import { Injectable, Logger } from '@nestjs/common';

import { RedisService } from '../shared/redis.service';

import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
    redis: RedisService;

    constructor(redisService: RedisService, public logger: Logger) {
        this.redis = redisService;
    }

    create(createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
    }

    async findAll() {
        await this.redis.set('lxing', new Date().toISOString(), 300);
        this.logger.debug('logger debug');
        return `This action returns all cats`;
    }

    findOne(id: number) {
        return `This action returns a #${id} cat`;
    }

    update(id: number, updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    remove(id: number) {
        return `This action removes a #${id} cat`;
    }
}
