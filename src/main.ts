import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 依赖在 AppModule 里引入 shared
    const config = app.get(ConfigService);
    const port = config.port || 3000;
    console.log('port', port);
    await app.listen(port);
}
process.nextTick(bootstrap);
