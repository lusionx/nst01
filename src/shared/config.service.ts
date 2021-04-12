import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
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
}
