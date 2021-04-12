import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    odata() {
        return {
            soc: 'http://soc.com/',
        };
    }

    redis() {
        return 'redis://127.0.0.1:6369/5?db=5';
    }
}
