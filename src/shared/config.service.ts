import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize';

@Injectable()
export class ConfigService {
    constructor(protected logger: Logger) {}
    odata() {
        return {
            soc: 'http://soc.com/',
        };
    }

    get redis() {
        return {
            db: 5,
        };
    }

    get port() {
        return 3010;
    }

    get sequelize() {
        this.logger.debug('config get sequelize');
        return new Sequelize('mysql://root:123123@127.0.0.1/mingpian', {});
    }
}
